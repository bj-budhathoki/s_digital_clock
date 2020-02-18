<script>
  import { onMount } from "svelte";
  import { fade } from "svelte/transition";
  import moment from "moment";
  let hours;
  let minutes;
  let seconds;
  let ampm;
  let dateFormat;
  let todayDate;
  let calender;
  let response;
  let weekDay;
  let isDay = true;
  let isNight = false;
  onMount(async () => {
    let res = await fetch(
      "https://staging.followmedia.tk/client/app/get-data/?appdata_id=09d38a3f-daa9-4d5d-9372-7b4b9103f2ce"
    );

    let data = await res.json();
    dateFormat = data.appData ? data.appData.dateFormat : "YYYY-MM-DD";
    response = data.appData || null;
  });

  function setDate() {
    if (response) {
      let today = moment().utcOffset(response.timeZone || "utc+5:45");
      todayDate = today.format(response ? response.dateFormat : "YYYY-MM-DD");
      hours = today.format(
        response && response.timeFormat === "12 Hours" ? "hh" : "HH"
      );
      minutes = today.format("mm");
      seconds = today.format("ss");
      ampm = today.format("A");
      weekDay = today.format("dddd");
    }
    getGreetingTime(moment());
  }

  //greeting
  function getGreetingTime(currentTime) {
    if (!currentTime || !currentTime.isValid()) {
      isDay = true;
      isNight = false;
      return;
    }
    const splitAfternoon = 12;
    const splitEvening = 17;
    const currentHour = parseFloat(currentTime.format("HH"));
    if (currentHour >= splitAfternoon && currentHour <= splitEvening) {
      // Between 12 PM and 5PM
      isDay = true;
      isNight = false;
      return "Good afternoon";
    } else if (currentHour >= splitEvening) {
      // Between 5PM and Midnight
      isDay = false;
      isNight = true;
      return "Good evening";
    }
    // Between dawn and noon
    isDay = true;
    isNight = false;
    return "Good morning";
  }

  setInterval(setDate, 1000);
</script>

<style lang="scss">
  main {
    background: linear-gradient(to right, #ff512f, #f09819);
    background-size: cover;
    background-position: center;
    background-repeat: no-repeat;
    width: 100%;
    height: 100%;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    position: relative;
    font-family: "Lato", sans-serif;
    &::after {
      content: "";
      width: 100%;
      height: 100%;
      background: rgba(12, 10, 10, 0.7);
      position: absolute;
      top: 0;
      left: 0;
      z-index: -1;
    }

    .clock {
      display: flex;
    }
    .clock {
      color: #fff;
      font-size: 40rem;
      & > .numbers,
      & > .colon {
        p {
          margin: 0;
        }
      }
      & > .am-pm {
        font-size: 4rem;
        align-self: flex-end;
      }
    }
    .today-date {
      font-size: 10rem;
      color: #e6e3e3;
    }
  }
  //   @media queries
  @media screen and (max-width: 2560px) {
    main {
      background-repeat: no-repeat;
      &::after {
        background: rgba(12, 10, 10, 0.5);
        position: absolute;
        top: 0;
        left: 0;
      }
      .clock {
        color: #fff;
        font-size: 30rem;
        & > .am-pm {
          font-size: 5rem;
        }
      }
      .today-date {
        font-size: 10rem;
      }
    }
  }
  @media screen and (max-width: 1920px) {
    main {
      background-repeat: no-repeat;
      &::after {
        background: rgba(12, 10, 10, 0.7);
        position: absolute;
        top: 0;
        left: 0;
      }
      .clock {
        color: #fff;
        font-size: 25rem;
        & > .numbers,
        & > .colon {
          p {
          }
        }
        & > .am-pm {
          font-size: 5rem;
        }
      }
      .today-date {
        font-size: 3rem;
      }
    }
  }
  @media screen and (max-width: 1580px) {
    main {
      background-repeat: no-repeat;
      &::after {
        background: rgba(12, 10, 10, 0.5);
      }
      .clock {
        color: #fff;
        font-size: 8rem;
        & > .numbers,
        & > .colon {
          p {
          }
        }
        & > .am-pm {
          font-size: 1.5rem;
        }
      }
      .today-date {
        font-size: 2rem;
      }
    }
  }
  @media screen and (max-width: 768px) {
    main {
      background-repeat: no-repeat;
      &::after {
        background: rgba(12, 10, 10, 0.5);
      }
      .clock {
        color: #fff;
        font-size: 3rem;
        & > .numbers,
        & > .colon {
          p {
          }
        }
        & > .am-pm {
          font-size: 1.4rem;
        }
      }
      .today-date {
        font-size: 1rem;
      }
    }
  }
  @media screen and (max-width: 480px) {
    main {
      background-repeat: no-repeat;
      &::after {
        background: rgba(12, 10, 10, 0.5);
      }
      .clock {
        font-size: 1rem;
        & > .numbers,
        & > .am-pm {
          font-size: 2rem;
        }
      }
      .today-date {
        font-size: 2.5rem;
      }
    }
  }
</style>

<main
  style="background-image:url('{response && response.background ? response.background : isDay ? '/img/bg-day.jpg' : '/img/bg-night.jpg'}')
  ">
  <!-- DAY OF THE WEEK -->
  {#if response}
    <!-- CLOCK -->
    <div class="clock" transition:fade={{ delay: 1000 }}>
      <!-- HOUR -->
      <div class="numbers">
        <p class="hours">{hours ? hours : '00'}</p>
      </div>
      <div class="colon">
        <p>:</p>
      </div>
      <!-- MINUTE -->
      <div class="numbers">
        <p class="minutes">{minutes ? minutes : '00'}</p>
      </div>
      <div class="colon">
        <p>:</p>
      </div>
      <!-- SECOND -->
      <div class="numbers">
        <p class="seconds">{seconds ? seconds : '00'}</p>
      </div>
      <div class="am-pm">
        <p>{ampm}</p>
      </div>

    </div>
    <div class="today-date" transition:fade={{ delay: 1100 }}>
      {weekDay} , &nbsp;{todayDate}
    </div>
  {/if}
</main>
