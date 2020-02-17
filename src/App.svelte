<script>
  import { onMount } from "svelte";
  import { fade } from "svelte/transition";
  import moment from "moment";
  let weekDay = [
    "sunday",
    "monday",
    "tuesday",
    "wednesday",
    "thursday",
    "friday",
    "saturday"
  ];
  let hours;
  let minutes;
  let seconds;
  let ampm;
  let dateFormat;
  let todayDate;
  let calender;
  let response;
  onMount(async () => {
    // "http://10.10.99.200:8080/client/app/get-data/?appdata_id=0712e6fd-1d99-4962-9701-c0d90797f863"
    let res = await fetch(
      "http://10.10.99.200:8080/client/app/get-data/?appdata_id=0712e6fd-1d99-4962-9701-c0d90797f863"
    );
    let data = await res.json();
    dateFormat = data.appData.dateFormat;
    response = data.appData;
  });

  function setDate() {
    if (response) {
      let currentDate = new Date()
        .toLocaleString({
          timeZone: response.timeZone,
          hour12: response.timeFormat === "12 Hours" ? true : false
        })
        .split(" ");
      let currentTime = currentDate[1].split(":");
      hours = `0${currentTime[0]}`.slice(-2);
      minutes = `0${currentTime[1]}`.slice(-2);
      seconds = `0${currentTime[2]}`.slice(-2);
      todayDate = currentDate[0];
      ampm = currentDate[2];
    }
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
    .days {
      display: grid;
      grid-template-columns: repeat(7, 1fr);
      grid-column-gap: 1rem;
      justify-content: center;
      align-items: center;
      z-index: 2;
      & > .day > p {
        text-transform: capitalize;
        color: #e6e3e3;
        font-size: 2.3rem;
        font-weight: normal;
        align-self: center;
      }
      & > .day > .light-on {
        color: #ffffff;
        font-weight: 900;
        //   font-size: 3rem;
      }
    }
    .clock {
      display: flex;
    }
    .clock {
      color: #fff;
      font-size: 25rem;
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
      font-size: 8rem;
      color: #e6e3e3;
    }
  }
  //   @media queries
  @media screen and (max-width: 2560px) {
    main {
      background-repeat: no-repeat;
      &::after {
        background: rgba(12, 10, 10, 0.7);
        position: absolute;
        top: 0;
        left: 0;
      }
      .days {
        & > .day > p {
          font-size: 2rem;
        }
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
      .days {
        & > .day > p {
          font-size: 1.6rem;
        }
      }
      .clock {
        color: #fff;
        font-size: 12rem;
        & > .numbers,
        & > .colon {
          p {
          }
        }
        & > .am-pm {
          font-size: 2rem;
        }
      }
      .today-date {
        font-size: 2.5rem;
      }
    }
  }
  @media screen and (max-width: 1280px) {
    main {
      background-repeat: no-repeat;
      &::after {
        background: rgba(12, 10, 10, 0.5);
      }
      .days {
        & > .day > p {
          font-size: 1.3rem;
        }
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
        // background: rgba(12, 10, 10, 0.5);
      }
      .days {
        grid-column-gap: 0.2rem;
        & > .day > p {
          font-size: 0.7rem;
        }
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
      .days {
        background: red;
        & > .day > p {
          font-size: 1rem;
        }
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
  style="background-image:url('{response && response.background ? response.background : 'https://cdn.pixabay.com/photo/2018/05/30/00/24/thunderstorm-3440450_960_720.jpg'}')
  ">
  <!-- DAY OF THE WEEK -->
  {#if response}
    <div class="days" transition:fade>
      {#each weekDay as day, i}
        <div class="day" transition:fade={{ duration: 800 * i + 1 }}>
          <p class={day} class:light-on={weekDay[new Date().getDay()] === day}>
            {day}
          </p>
        </div>
      {/each}
    </div>
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
      {moment().format(dateFormat ? dateFormat : 'YYYY/MM/DD')}
    </div>
  {/if}
</main>
