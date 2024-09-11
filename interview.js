// Given n non-negative integers representing an elevation map where the width of each bar is 1, compute how much water it can trap after raining.

function calculateWater(heights) {
  let fwdMax = [];
  let backMax = [];
  let sum = 0;
  let len = heights.length;
  let waterTrapped = [];
  fwdMax[0] = heights[0];
  backMax[len - 1] = heights[len - 1];

  for (let i = 1; i < len; i++) {
    fwdMax[i] = Math.max(heights[i], fwdMax[i - 1]);
  }
  for (let i = len - 2; i >= 0; i--) {
    backMax[i] = Math.max(heights[i], backMax[i + 1]);
  }
  console.log(fwdMax);
  console.log(backMax);

  for (let i = 0; i < len; i++) {
    let s = Math.min(fwdMax[i], backMax[i]) - heights[i];
    sum += s;
    waterTrapped.push(s);
  }
  displayGraph(heights, waterTrapped);
  return sum;
  console.log("rain water trapped", sum);
}
//[1, 2, 3, 0, 3, 3, 0, 1, 1, 6, 0, 0, 1]

document
  .getElementById("calculate")
  .addEventListener("click", function (event) {
    event.preventDefault();
    let data = document.getElementById("heights");
    let heights = data.value;
    heights = heights.split(",");
    let res = calculateWater(heights);
    console.log(typeof heights);
    document.getElementById("result").textContent = res;
  });
function displayGraph(heights, waterTrapped) {
  let graph = document.getElementById("graph");
  graph.innerHTML = "";
  for (let i = 0; i < heights.length; i++) {
    let block = document.createElement("div");
    block.style.position = `relative`;
    let bar = document.createElement("div");
    bar.classList.add("building");
    bar.style.height = `${heights[i] * 20}px`;
    bar.style.width = `20px`;
    //bar.style.bottom = "0";

    let waterLevel = document.createElement("div");
    waterLevel.classList.add("water");
    waterLevel.style.height = `${waterTrapped[i] * 20}px`;
    waterLevel.style.width = `20px`;
    waterLevel.style.position = `absolute`;
    waterLevel.style.bottom = `${heights[i] * 20}px`;

    block.appendChild(bar);
    block.appendChild(waterLevel);

    graph.appendChild(block);
  }
}
