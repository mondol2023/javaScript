const roomPrice ={
    single: 600,
    double: 1000,
    Suite:2000,
}

const user ={
    admin : "password123",
}

document.getElementById("loginform").addEventListener("submit", (event) => {
    event.preventDefault();

    const username = document.getElementById("username").value;
    const password= document.getElementById("password").value;

    if(users[username] === password) {
        alert("Login successful!");
        document.getElementById("login-Form").style.display = "none";

        if(username === "admin") {
            document.getElementById("admin-dashboard").style.display="block";
        }
        else
        {
            document.getElementById("bookingForm").style.display= "block";
        }
    }
    else 
    {
        alert(" Invalid username or password");
    }
});

document.getElementById("roomForm").addEventListener("submit", (event) => {
    event.preventDefault();
  
    const name = document.getElementById("name").value;
    const roomType = document.getElementById("roomType").value;
    const nights = document.getElementById("nights").value;
    const cost = roomPrice[roonType] * nights;

    const booking = { name , roomType, nights, cost };
    let bookings = JSON.parse(localStorage.getItem("bookings")) || [];

    alert("booking successful!");
    bookings.push(booking);

    document.getElementById("bookingForm").reset();
});


document.getElementById("viewBookings").addEventListener("click", () => {
    const bookings = JSON.parse(localStorage.getItem("bookings")) || [];
    const adminBookingList = document.getElementById("admin-booking-list");
    adminBookingList.innerHTML = "";

    bookings.forEach((booking, index) => {
        const listItem = document.createElement("li");
        listItem.innerHTML = `
            <strong>${index + 1}. ${booking.name}</strong>- ${booking.roomType} - ${booking.nights} nights - ${booking.cost}`;
        adminBookingList.appendChild(listItem);
    });
});