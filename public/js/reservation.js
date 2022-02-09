$(function () {
  let InformationBox = $(".showInformation");
  let select = $("<select>");

  let getNumbersOfRooms = () => {
    $.get("/rooms", (roomNumbers) => {
      $.each(roomNumbers, (_, room) => {
        let option = $("<option>")
          .text(room.roomNumber)
          .attr("value", room._id);
        $('[ name="roomList"]').append(option);
      });
    });
  };
  getNumbersOfRooms();

  let catchRoomNumberField = () => {
    return $('[ name="roomList"]').val();
  };
  let catchCapacityField = () => {
    return $('[data-role="capacity"]').val();
  };

  let createReservationObj = () => {
    let reservationObj = {};
    reservationObj["room_id"] = catchRoomNumberField();
    reservationObj["capacity"] = catchCapacityField();
    return reservationObj;
  };

  $('[ data-role="insert-reservation"]').click(() => {
    let reservationObj = createReservationObj();
    $.post("/reservations", reservationObj, () => {
      alert("Data inserted");
      resetField();
    });
  });

  $('[data-role="find-reservations"]').click(() => {
    $.get("/reservations", (reservations) => {
      showAllReservations(reservations);
    });
  });

  let showAllReservations = (reservations) => {
    $.each(reservations, (_, reservation) => {
      getOneReservation(reservation);
    });
  };

  let getOneReservation = (reservation) => {
    let reservationDiv = $(
      `<div id=${reservation._id} class="reservationDiv">`
    );
    $.each(reservation, (key, reservationField) => {
      let row = $(`<p>${key.replaceAll("_", "")} : ${reservationField}</p>`);
      reservationDiv.append(row);
      $(InformationBox).append(reservationDiv);
    });
  };

  function getSelectList() {
    $.ajax({
      url: "/reservations",
      dataType: "json",
      success: function (reservations) {
        $.each(reservations, function (_, reservation) {
          $(select).append($("<option></option>").text(reservation._id));
          $(InformationBox).append(select);
        });
      },
    });
  }

  let selectReservationId = () => {
    $(select).change(() => {
      let reservationId = $(select).val();
      $.get("/reservations/" + reservationId, (reservation) => {
        getOneReservation(reservation);
      });
    });
  };

  $('[data-role="find-reservation"]').click(() => {
    getSelectList();
    selectReservationId();
  });

  $('[data-role="update-reservation"]').click(() => {
    getSelectList();
    $(select).change(() => {
      let reservationId = $(select).val();
      $.get("/reservations/" + reservationId, (reservation) => {
        $('[name="roomList"]').val(reservation.room_id);
        $('[data-role="capacity"]').val(reservation.capacity);
      });
    });
  });

  $('[data-role="save-reservation" ]').click(() => {
    let updatedReservation = createReservationObj();
    const requestOptions = {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(updatedReservation),
    };
    fetch("/reservations/" + $(select).val(), requestOptions)
      .then((response) => response.json())
      .then(() => alert("Data saved"))
      .catch((err) => console.log(err));
    resetField();
  });

  $('[data-role="delete-reservation" ]').click(() => {
    getSelectList();
    $(select).change(function () {
      $.ajax({
        url: "/reservations/" + $(this).val(),
        type: "DELETE",
        dataType: "json",
        success: function () {
          alert("Data deleted");
        },
      });
    });
  });

  $('[data-role="find-capacity"]').click(function () {
    fetch("/reservations/reservation/capacity")
      .then((response) => response.json())
      .then((reservation) => showAllReservations(reservation))
      .catch((err) => console.log(err));
  });

  function resetField() {
    $("input[type=number]").val("");
  }
});
