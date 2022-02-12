$(function () {
  let InformationBox = $(".showInformation");
  let select = $("<select>");

  function catchAllFields() {
    let roomObj = {};
    let vip = $('[ data-role="vip"]').is(":checked"),
      bath = $('[ data-role="bath"]').is(":checked"),
      roomNumber = $('[data-role="room-number"]').val();
    roomObj["isVip"] = vip;
    roomObj["haveBath"] = bath;
    roomObj["roomNumber"] = roomNumber;
    return roomObj;
  }

  $('[ data-role="insert-room"]').click(() => {
    let roomObject = catchAllFields();
    $.post("/rooms", roomObject, () => {
      alert("Data inserted");
      resetAllFields();
    }).fail((err) => {
      if (err.status == 400) {
        let jsonErrors = err.responseJSON.errors;
        $.each(jsonErrors, (field, err) => {
          alert(err.message);
        });
      }
    });
  });

  $('[data-role="find-rooms"]').click(() => {
    $.get("/rooms", (rooms) => {
      showAllRooms(rooms);
    });
  });

  $('[data-role="find-room"]').click(() => {
    getSelectList();
    selectRoomId();
  });

  function getSelectList() {
    $.ajax({
      url: "/rooms",
      dataType: "json",
      success: function (rooms) {
        $.each(rooms, function (i, room) {
          $(select).append(
            $("<option></option>").attr("value", room._id).text(room.roomNumber)
          );
          $(InformationBox).append(select);
        });
      },
    });
  }

  let showAllRooms = (rooms) => {
    $.each(rooms, (_, room) => {
      getOneRoom(room);
    });
  };

  $('[data-role="update-room"]').click(() => {
    getSelectList();
    $(select).change(() => {
      let roomId = $(select).val();
      $.get("/rooms/" + roomId, (room) => {
        $('[data-role="room-number"]').val(room.roomNumber);
        $('[data-role="vip"]').prop("checked", room.isVip);
        $('[data-role="bath"]').prop("checked", room.haveBath);
      });
    });
  });

  $('[data-role="save-room" ]').click(() => {
    let updatedRoom = catchAllFields();
    const requestOptions = {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(updatedRoom),
    };
    fetch("/rooms/" + $(select).val(), requestOptions)
      .then((response) => response.json())
      .then(() => alert("Data saved"));
    resetAllFields();
  });

  $('[data-role="delete-room" ]').click(() => {
    getSelectList();
    $(select).change(function () {
      $.ajax({
        url: "/rooms/" + $(this).val(),
        type: "DELETE",
        dataType: "json",
        success: function () {
          alert("Data deleted");
        },
      });
    });
  });

  let getOneRoom = (room) => {
    let roomDiv = $(`<div id=${room._id} class="roomDiv">`);
    $.each(room, (key, roomField) => {
      let row = $(`<p>${key.replaceAll("_", "")} : ${roomField}</p>`);
      roomDiv.append(row);
      $(InformationBox).append(roomDiv);
    });
  };

  let selectRoomId = () => {
    $(select).change(() => {
      let roomId = $(select).val();
      $.get("/rooms/" + roomId, (room) => {
        getOneRoom(room);
      });
    });
  };

  $('[data-role="find-bath"]').click(() => {
    fetch("/rooms/find/bath")
      .then((response) => response.json())
      .then((rooms) => showAllRooms(rooms))
      .catch((err) => console.log(err));
  });

  $('[ data-role="bath-vip"]').click(() => {
    fetch("rooms/find/bathOrVip")
      .then((response) => response.json())
      .then((rooms) => showAllRooms(rooms))
      .catch((err) => console.log(err));
  });

  function resetAllFields() {
    $("input[type=number]").val("");
    $("input[type=checkbox]").prop("checked", false);
  }
});
