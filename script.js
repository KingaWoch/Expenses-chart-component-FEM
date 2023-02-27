const chart = document.querySelector(".chart");
const date = new Date(Date.UTC(2012, 11, 20, 3, 0, 0));
const options = { weekday: "short" };
const dateStr = date.toLocaleDateString(undefined, options).toLowerCase();

fetch("data.json")
  .then((res) => res.json())
  .then((data) => {
    data.forEach((result) => {
      chart.innerHTML += `
        <div class="chart-item ${result.day == dateStr ? "active" : ""}" id="${
        result.day
      }" onClick="showAmount(${result.day})">
            <div class="hover-display">$${result.amount}</div>
            <div class="day ${result.day}"></div>
            <div class="bar" style="height: ${
              (result.amount / 100) * 200
            }px"></div>
            <p class="label">${result.day}</p>
        </div>
        `;
    });
  })
  .catch((error) => console.log(error));

function showAmount(day) {
  const items = document.getElementsByClassName("chart-item");
  for (let i = 0; i < items.length; i++) {
    const item = items[i];
    if (item.classList.contains("active")) {
      item.classList.remove("active");
    }
    day.classList.add("active");
  }
}
