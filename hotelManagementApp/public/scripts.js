document.addEventListener("DOMContentLoaded", () => {
    const loginForm = document.getElementById("loginform");
    const registerForm = document.getElementById("register-form");
    const bookingForm = document.getElementById("roomForm");
    const adminDashboard = document.getElementById("admin-dashboard");
    const adminBookingList = document.getElementById("admin-booking-list");
    const bookingFormSection = document.getElementById("bookingForm");
    const viewBookingsButton = document.getElementById("viewBookings");

    loginForm.addEventListener("submit", async (event) => {
        event.preventDefault();

        const username = document.getElementById("username").value;
        const password = document.getElementById("password").value;

        try {
            const response = await fetch("/login", {
                method: 'POST',
                headers: { 'Content-Type' : 'application/json' },
                body: JSON.stringyfy( {username, password}),
                });

                const data = await response.json();

                if(response.ok) {
                    console.log(data.message);
                    loginForm.style.display = "none";

                    localStorage.setItem('loggedInUser', username);

                    if(username === "admin") {
                        adminDashboard.style.display = "block";
                        bookingFormSection.style.display = "none";
                        loadAdminBookings();
                    }
                    else {
                        bookingFormSection.style.display = "block";
                        adminDashboard.style.display = "none";
                    }
                    loginForm.reset();
                }
                else {
                    alert(data.message);
                }
            }
            catch (error) {
                console.error('login failed', error);
                alert('An error occured');
            }
        });

        roomForm.addEventListener("submit", async (event) => {
            event.preventDefault();
    
            const name = document.getElementById("name").value;
            const roomType = document.getElementById("roomType").value;
            const nights = parseInt(document.getElementById("nights").value);

            try {
                const response = await fetch("/booking", {
                    method: 'POST',
                    headers: { 'Content-Type' : 'application/json' },
                    body: JSON.stringyfy( {name, roomType, nights }),
                    });
    
                    const data = await response.json();

                    if (response.status === 201) {
                        console.log(data.message);
                        roomForm.reset();
                    }
                    else{
                        alert(data.message || "booking failed");
                    }
            }
            catch (error) {
                console.error("booking failed", error);
                alert("An error occured");   
            }
        });

        async function loadAdminBookings() {
            try {
                const response = await fetch("/admin/bookings");
                const data = await response.json();

                if (response.ok) {
                    adminBookingList.innerHTML = "";
                    bookings.forEach((booking, index) => {
                        const listItem = document.createElement("li");
                        listItem.innerHTML = `
                            <strong>${index + 1}. ${booking.name}</strong>- ${booking.roomType} - ${booking.nights} nights - ${booking.cost} 
                             (Booked on : ${new Date (booking.bookingDate).toLocaleDateString()} ${new Date (booking.bookingDate).toLocaleTimeString() })`;
                        adminBookingList.appendChild(listItem);
                    });
                } else {
                    alert('failed booking.');       
                }
            }
            catch(error) {
                console.error("error loading booking", error);
                alert("An error occured");
            }
        }
        if (viewBookingsButton) {
            viewBookingsButton.addEventListener("click", () => {
                loadAdminBookings();
            });
        }
        const loggedInUser = localStorage.getItem("loggedInUser");
        if(loggedInUser) {
            loginForm.style.display = "none";
            if(loggedInUser === "admin") {
                adminDashboard.style.display = "block";
                bookingFormSection.style.display = "none";
                loadAdminBookings();
            }
            else {
                bookingFormSection.style.display = "block";
                adminDashboard.style.display = "none";
            }
        }
    });
