
/* ========================================
   WILLIAM & ISABELLA
   JavaScript - Our Little Fairytale
======================================== */

/* ========================================
   SUPABASE - LOVEE CONNECTION
======================================== */

const LOVEE_URL = "https://aqjtxnvixhqtyagknqnq.supabase.co";

const LOVEE_PUBLIC_KEY = "sb_publishable_x9xLHghaDNtnniRO9x8flA_cDI5hEWW";

const lovee = window.supabase.createClient(
    LOVEE_URL,
    LOVEE_PUBLIC_KEY
);

// Make Supabase available to the rest of the website.
window.lovee = lovee;

// Check the connection.
async function testLoveeConnection() {
    try {
        const { error } = await lovee.auth.getSession();

        if (error) throw error;

        console.log("♡ Lovee connected successfully ♡");

    } catch (error) {
        console.error("Lovee connection error:", error.message);
    }
}

testLoveeConnection();


/* ========================================
   1. CONFIGURATION
======================================== */

// PERSONAL INFORMATION
// Replace these values with the real information.

const CONFIG = {

    isabella: {
        name: "Isabella",
        city: "Her City",
        timezone: "America/Santo_Domingo",
        latitude: 18.4861,
        longitude: -69.9312
    },

    william: {
        name: "William",
        city: "His City",
        timezone: "America/Chicago",
        latitude: 41.8781,
        longitude: -87.6298
    },

    // Set the date of your next meeting.
    meetingDate: "2027-12-25T12:00:00"

};


/* ========================================
   2. DIGITAL CLOCKS
======================================== */

function updateClocks() {

    const isabellaClock =
        document.getElementById("isabella-clock");

    const williamClock =
        document.getElementById("william-clock");


    const getTime = (timezone) => {

        return new Intl.DateTimeFormat("en-US", {
            timeZone: timezone,
            hour: "2-digit",
            minute: "2-digit",
            second: "2-digit",
            hour12: true
        }).format(new Date());

    };


    isabellaClock.textContent =
        getTime(CONFIG.isabella.timezone);

    williamClock.textContent =
        getTime(CONFIG.william.timezone);

}


updateClocks();

setInterval(updateClocks, 1000);


/* ========================================
   3. PERSONAL CITY NAMES
======================================== */

document.getElementById("isabella-city").textContent =
    CONFIG.isabella.city;

document.getElementById("william-city").textContent =
    CONFIG.william.city;


/* ========================================
   4. DISTANCE CALCULATOR
======================================== */

function calculateDistance(lat1, lon1, lat2, lon2) {

    const earthRadius = 6371;

    const toRadians = degrees => degrees * Math.PI / 180;

    const latitudeDifference = toRadians(lat2 - lat1);

    const longitudeDifference = toRadians(lon2 - lon1);


    const a =

        Math.sin(latitudeDifference / 2) ** 2 +

        Math.cos(toRadians(lat1)) *
        Math.cos(toRadians(lat2)) *

        Math.sin(longitudeDifference / 2) ** 2;


    const c = 2 * Math.atan2(
        Math.sqrt(a),
        Math.sqrt(1 - a)
    );


    return Math.round(earthRadius * c);

}


const distance = calculateDistance(

    CONFIG.isabella.latitude,
    CONFIG.isabella.longitude,

    CONFIG.william.latitude,
    CONFIG.william.longitude

);


document.getElementById("distance-counter").textContent =
    distance.toLocaleString("en-US") + " km";


/* ========================================
   5. NEXT MEETING COUNTDOWN
======================================== */

function updateCountdown() {

    const targetDate = new Date(CONFIG.meetingDate).getTime();

    const now = Date.now();

    const difference = targetDate - now;


    const days = document.getElementById("days");

    const hours = document.getElementById("hours");

    const minutes = document.getElementById("minutes");

    const seconds = document.getElementById("seconds");


    if (difference <= 0) {

        days.textContent = "00";
        hours.textContent = "00";
        minutes.textContent = "00";
        seconds.textContent = "00";

        return;

    }


    const dayValue = Math.floor(
        difference / (1000 * 60 * 60 * 24)
    );

    const hourValue = Math.floor(
        (difference / (1000 * 60 * 60)) % 24
    );

    const minuteValue = Math.floor(
        (difference / (1000 * 60)) % 60
    );

    const secondValue = Math.floor(
        (difference / 1000) % 60
    );


    days.textContent = String(dayValue).padStart(2, "0");

    hours.textContent = String(hourValue).padStart(2, "0");

    minutes.textContent = String(minuteValue).padStart(2, "0");

    seconds.textContent = String(secondValue).padStart(2, "0");

}


updateCountdown();

setInterval(updateCountdown, 1000);


/* ========================================
   6. PINK & BLUE THEME SWITCHER
======================================== */

const themeButton = document.getElementById("theme-toggle");

let currentTheme = "pink";


themeButton.addEventListener("click", () => {

    if (currentTheme === "pink") {

        document.documentElement.style.setProperty(
            "--background", "#f0f6ff"
        );

        document.documentElement.style.setProperty(
            "--pink-dark", "#91b5dc"
        );

        document.documentElement.style.setProperty(
            "--pink", "#dceafa"
        );

        currentTheme = "blue";

        themeButton.textContent = "✧ Pink Theme";

    } else {

        document.documentElement.style.setProperty(
            "--background", "#fff7fb"
        );

        document.documentElement.style.setProperty(
            "--pink-dark", "#d99ab8"
        );

        document.documentElement.style.setProperty(
            "--pink", "#f8dce8"
        );

        currentTheme = "pink";

        themeButton.textContent = "✧ Blue Theme";

    }

});


/* ========================================
   7. BACKGROUND MUSIC
======================================== */

const music = document.getElementById("background-music");

const musicButton = document.getElementById("music-toggle");


musicButton.addEventListener("click", async () => {

    try {

        if (music.paused) {

            await music.play();

            musicButton.textContent = "♫ Pause Music";

        } else {

            music.pause();

            musicButton.textContent = "♫ Play Music";

        }

    } catch (error) {

        console.log("Music could not be played:", error);

    }

});


/* ========================================
   8. FLOATING FIREFLIES
======================================== */

const firefliesContainer =
    document.querySelector(".fireflies");


function createFirefly() {

    const firefly = document.createElement("span");

    firefly.classList.add("firefly");

    firefly.style.left = Math.random() * 100 + "%";

    firefly.style.top = Math.random() * 100 + "%";

    firefly.style.animationDelay =
        Math.random() * 5 + "s";

    firefly.style.animationDuration =
        (3 + Math.random() * 5) + "s";


    firefliesContainer.appendChild(firefly);

}


for (let i = 0; i < 35; i++) {

    createFirefly();

}


/* ========================================
   9. SCROLL REVEAL
======================================== */

const sections = document.querySelectorAll(".section");


const observer = new IntersectionObserver((entries) => {

    entries.forEach(entry => {

        if (entry.isIntersecting) {

            entry.target.classList.add("visible");

        }

    });

}, {
    threshold: 0.15
});


sections.forEach(section => {

    observer.observe(section);

});


/* ========================================
   10. CONSOLE MESSAGE
======================================== */

console.log(
    "♡ Welcome to William & Isabella's little universe ♡"
);
