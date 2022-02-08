$(function () {
  let catchNameField = () => {
    return $('[data-role="name"]').val();
  };
  let catchGenderField = () => {
    return $('[name="genderList"]').val();
  };
  let catchDateField = () => {
    return $('[data-role="date"]').val();
  };
  let catchVipCheckbox = () => {
    return $('[data-role="vip"]').is(":checked");
  };

  let createGuestObj = () => {
    let guestObj = {};
    guestObj["name"] = catchNameField();
    guestObj["gender"] = catchGenderField();
    guestObj["dateOfBirth"] = catchDateField();
    guestObj["isVip"] = catchVipCheckbox();
    return guestObj;
  };

  $('[ data-role="insert-guest"]').click(() => {
    let guestObj = createGuestObj();
    $.post("/guests", guestObj, () => {
      alert("Data inserted");
      resetAllFields();
    });
  });

  $('[data-role="find-guests"]').click(() => {
    $.get("/guests", (guests) => {
      showAllGuests(guests);
    });
  });

  let InformationBox = $(".showInformation");
  let select = $("<select>");

  $('[data-role="find-guest"]').click(() => {
    getSelectList();
    selectGuestId();
  });

  $('[data-role="update-guest"]').click(() => {
    getSelectList();
    $(select).change(() => {
      let guestId = $(select).val();
      $.get("/guests/" + guestId, (guest) => {
        let date = new Date(guest.dateOfBirth).toISOString().slice(0, 10);
        $('[data-role="name"]').val(guest.name);
        $('[name="genderList"]').val(guest.gender);
        $('[data-role="date"]').val(date);
        $('[data-role="vip"]').prop("checked", guest.isVip);
      });
    });
  });

  $('[data-role="save-guest" ]').click(() => {
    let updatedObject = createGuestObj();
    const requestOptions = {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(updatedObject),
    };
    fetch("/guests/" + $(select).val(), requestOptions)
      .then((response) => response.json())
      .then(() => alert("Data saved"));
    resetAllFields();
  });

  function getSelectList() {
    $.ajax({
      url: "/guests",
      dataType: "json",
      success: function (guests) {
        $.each(guests, function (i, guest) {
          $(select).append(
            $("<option></option>").attr("value", guest._id).text(guest.name)
          );
          $(InformationBox).append(select);
        });
      },
    });
  }

  let selectGuestId = () => {
    $(select).change(() => {
      let guestId = $(select).val();
      $.get("/guests/" + guestId, (guest) => {
        getOneGuest(guest);
      });
    });
  };

  let showAllGuests = (guests) => {
    $.each(guests, (_, guest) => {
      if (guest.dateOfBirth) {
        let date = new Date(guest.dateOfBirth).toISOString().slice(0, 10);
        guest.dateOfBirth = date;
      }
      getOneGuest(guest);
    });
  };

  $('[data-role="delete-guest" ]').click(() => {
    getSelectList();
    $(select).change(function () {
      $.ajax({
        url: "/guests/" + $(this).val(),
        type: "DELETE",
        dataType: "json",
        success: function () {
          alert("Data deleted");
        },
      });
    });
  });

  $('[ data-role="female-guest"]').click(() => {
    $.get("/guests", (guest) => {
      console.log(guest);
    });
  });

  let getOneGuest = (guest) => {
    let guestDiv = $(`<div id=${guest._id} class="guestDiv">`);
    $.each(guest, (key, guestField) => {
      let row = $(`<p>${key.replaceAll("_", "")} : ${guestField}</p>`);
      guestDiv.append(row);
      $(InformationBox).append(guestDiv);
    });
  };
  function resetAllFields() {
    $("input[type=text], input[type=date]").val("");
    $('[name="genderList"]').val();
    $('[data-role="vip"]').prop("checked", false);
  }
});
