// Initialize interview list, rejected list, and current status variables
let interviewList = [];
let rejectedList = [];
let currentStatus = "all";

// Initialize Dashboard Counter
const total = document.getElementById("total");
const interview = document.getElementById("interview");
const rejected = document.getElementById("rejected");

// Initialize job card counter  variables
let interviewCount = 0;
let rejectedCount = 0;

const allCardSection = document.getElementById("all-cards-section");
const mainSection = document.querySelector("main");
const filterSection = document.getElementById("filter-section");
console.log(mainSection);

// Initialize job counter
const Jobcounter = document.getElementById("total-job-counter");
const totalJobsNumber = allCardSection.querySelectorAll('.job-card').length;

Jobcounter.innerHTML = `
${totalJobsNumber} Jobs
`;
console.log(Jobcounter);

// Counter calculation function
total.innerText = allCardSection.querySelectorAll('.job-card').length;
function calculationCounter() {
  interviewCount = interviewList.length;
  rejectedCount = rejectedList.length;
  total.innerText = allCardSection.querySelectorAll('.job-card').length;
  interview.innerText = interviewList.length;
  rejected.innerText = rejectedList.length;
}
// Toggle filter button selection
const allFilterBtn = document.getElementById("all-filter-btn");
const interviewFilterBtn = document.getElementById("interview-filter-btn");
const rejectedFilterBtn = document.getElementById("rejected-filter-btn");
function filtering(id) {
  allFilterBtn.classList.remove("bg-blue-500", "text-white");
  interviewFilterBtn.classList.remove("bg-blue-500", "text-white");
  rejectedFilterBtn.classList.remove("bg-blue-500", "text-white");

  currentStatus = id;

  const selected = document.getElementById(id);
  selected.classList.add("bg-blue-500", "text-white");

  const totalJobsNumber = allCardSection.querySelectorAll('.job-card').length;

  if (id === "interview-filter-btn") {
    allCardSection.classList.add("hidden");
    filterSection.classList.remove("hidden");
    renderInterview();

    Jobcounter.innerHTML = `
        ${interviewCount} of ${totalJobsNumber} Jobs
        `;
  } else if (id === "rejected-filter-btn") {
    allCardSection.classList.add("hidden");
    filterSection.classList.remove("hidden");
    renderRejected();

    Jobcounter.innerHTML = `
        ${rejectedCount} of ${totalJobsNumber} Jobs
        `;
  } else if (id === "all-filter-btn") {
    allCardSection.classList.remove("hidden");
    filterSection.classList.add("hidden");

    // Check if all jobs have been deleted
    if (totalJobsNumber === 0) {
      allCardSection.innerHTML = `
        <div class="empty-state bg-white flex flex-col items-center justify-center py-12">
          <img src="jobs.png" alt="" class="w-32 h-32 mb-4">
          <p class="text-gray-500 text-lg">No jobs available</p>
          <p class="text-gray-400 text-sm">Check back soon for new job opportunities</p>
        </div>
      `;
    }

    Jobcounter.innerHTML = `
        ${totalJobsNumber} Jobs
         `;
  }
}

// Add interview cards in the interview list

document.addEventListener("click", function (event) {
  const parentNode = event.target.parentNode.parentNode.parentNode;

  if (event.target.classList.contains("interview-btn")) {
    const jobName = parentNode.querySelector(".job-name").innerText;
    const jobType = parentNode.querySelector(".job-type").innerText;
    const jobBenefit = parentNode.querySelector(".job-benefit").innerText;
    const status = parentNode.querySelector(".job-status").innerText;
    const jobDescription = parentNode.querySelector(".description").innerText;

    const cardInfo = {
      jobName,
      jobType,
      jobBenefit,
      status,
      jobDescription,
    };

    // Check if job was previously in rejected list
    const wasInRejected = rejectedList.some(
      (item) => item.jobName == cardInfo.jobName,
    );

    const jobNameExist = interviewList.find(
      (item) => item.jobName == cardInfo.jobName,
    );
    if (!jobNameExist) {
      cardInfo.status = "Interview";
      interviewList.push(cardInfo);

      // Update the status text in the job card
      parentNode.querySelector(".job-status").innerText = "Interview";
      parentNode
        .querySelector(".job-status")
        .classList.remove("bg-blue-100", "bg-red-100");
      parentNode.querySelector(".job-status").classList.add("bg-green-100");
    }

    // Check the interview card in the rejected card list if it is here than remove the card
    rejectedList = rejectedList.filter(
      (item) => item.jobName != cardInfo.jobName,
    );

    // If the job was moved from rejected to interview, ensure status is updated
    if (wasInRejected && !jobNameExist) {
      parentNode.querySelector(".job-status").innerText = "Interview";
      parentNode
        .querySelector(".job-status")
        .classList.remove("bg-blue-100", "bg-red-100");
      parentNode.querySelector(".job-status").classList.add("bg-green-100");
    }

    // Rendering the rejected list
    if (currentStatus === "rejected-filter-btn") {
      renderRejected();
    }

    calculationCounter();
  } else if (event.target.classList.contains("rejected-btn")) {
    const jobName = parentNode.querySelector(".job-name").innerText;
    const jobType = parentNode.querySelector(".job-type").innerText;
    const jobBenefit = parentNode.querySelector(".job-benefit").innerText;
    const status = parentNode.querySelector(".job-status").innerText;
    const jobDescription = parentNode.querySelector(".description").innerText;

    const cardInfo = {
      jobName,
      jobType,
      jobBenefit,
      status,
      jobDescription,
    };

    // Check if job was previously in interview list
    const wasInInterview = interviewList.some(
      (item) => item.jobName == cardInfo.jobName,
    );

    const jobNameExist = rejectedList.find(
      (item) => item.jobName == cardInfo.jobName,
    );
    if (!jobNameExist) {
      cardInfo.status = "Rejected";
      rejectedList.push(cardInfo);

      // Update the status text in the job card
      parentNode.querySelector(".job-status").innerText = "Rejected";
      parentNode
        .querySelector(".job-status")
        .classList.remove("bg-blue-100", "bg-green-100");
      parentNode.querySelector(".job-status").classList.add("bg-red-100");
    }

    // Check the rejected card in the interview card list if it is here than remove the card
    interviewList = interviewList.filter(
      (item) => item.jobName != cardInfo.jobName,
    );

    // If the job was moved from interview to rejected, ensure status is updated
    if (wasInInterview && !jobNameExist) {
      parentNode.querySelector(".job-status").innerText = "Rejected";
      parentNode
        .querySelector(".job-status")
        .classList.remove("bg-blue-100", "bg-green-100");
      parentNode.querySelector(".job-status").classList.add("bg-red-100");
    }

    // Rendering the interview list
    if (currentStatus === "interview-filter-btn") {
      renderInterview();
    }

    calculationCounter();
  } else if (
    event.target.classList.contains("delete-btn") ||
    event.target.closest(".delete-btn")
  ) {
    const parentNode = event.target.closest(".job-card");
    const jobName = parentNode.querySelector(".job-name").innerText;

    // Remove the card from interview list, if present in the interview list
    interviewList = interviewList.filter((item) => item.jobName !== jobName);

    // Remove the card  from rejected list, if present in the rejected list
    rejectedList = rejectedList.filter((item) => item.jobName !== jobName);

    // Find and remove the original card from allCardSection
    const allCards = allCardSection.querySelectorAll(".job-card");
    for (const card of allCards) {
      const cardJobName = card.querySelector(".job-name").innerText;
      if (cardJobName === jobName) {
        card.remove();
        break;
      }
    }

    // Remove the current card from DOM (if it's a filtered view card)
    if (currentStatus !== "all-filter-btn") {
      parentNode.remove();
    }

    calculationCounter();

    const totalJobsNumber = allCardSection.querySelectorAll('.job-card').length;
    Jobcounter.innerHTML = totalJobsNumber === 0 ? `No jobs available` : `${totalJobsNumber} Jobs`;

    // Check if all jobs have been deleted while viewing the "all" section
    if (!allCardSection.classList.contains("hidden") && totalJobsNumber === 0) {
      allCardSection.innerHTML = `
        <div class="empty-state bg-white flex flex-col items-center justify-center py-12">
          <img src="jobs.png" alt="" class="w-32 h-32 mb-4">
          <p class="text-gray-500 text-lg">No jobs available</p>
          <p class="text-gray-400 text-sm">Check back soon for new job opportunities</p>
        </div>
      `;
    }

    if (currentStatus === "interview-filter-btn") {
      renderInterview();
      Jobcounter.innerHTML = `${interviewCount} of ${totalJobsNumber} Jobs`;
    } else if (currentStatus === "rejected-filter-btn") {
      renderRejected();
      Jobcounter.innerHTML = `${rejectedCount} of ${totalJobsNumber} Jobs`;
    }
  }
});

// Create interview card  in the interview filter section
function renderInterview() {
  filterSection.innerHTML = "";

  // Check if interview list is empty
  if (interviewList.length === 0) {
    filterSection.innerHTML = `
      <div class="empty-state bg-white flex flex-col items-center justify-center py-12">
        <img src="jobs.png" alt="" class="w-32 h-32 mb-4 ">
        <p class="text-gray-500 text-lg">No jobs available</p>
        <p class="text-gray-400 text-sm">Check back soon for new job opportunities</p>
      </div>
    `;
    return;
  }

  for (const interview of interviewList) {
    const div = document.createElement("div");
    div.className =
      "job-card flex justify-between bg-white p-5 rounded-md shadow shadow-black/50";
    div.innerHTML = `
            <div class="left">
                <h2 class="job-name font-medium text-xl">${interview.jobName}</h2>
                <p class="job-type text-gray-500 font-medium">${interview.jobType}</p>
                <p class="job-benefit my-5 text-gray-500"> ${interview.jobBenefit} </p>
                <p class="job-status bg-green-100 py-1 px-3 rounded text-balance max-w-max mb-2"> ${interview.status} </p>
                <p id="description" class="description text-gray-500 mb-5"> ${interview.jobDescription} </p>
                <div class="btn-containe space-x-3">
                    <button
                        class="interview-btn border-green-600 border-2 px-2 py-1 text-green-700"
            >Interview</button>
                  <button
                        class="rejected-btn border-red-600 border-2 px-2 py-1 text-red-700">Rejected</button>
                </div>
            </div>

            <div class="right">
                <button class="delete-btn btn rounded-full shadow w-8 h-8"><i class="fa-regular fa-trash-can"></i></button>
            </div>
        
        `;

    filterSection.appendChild(div);
  }
}

// Create rejected card  in the rejected filter section

function renderRejected() {
  filterSection.innerHTML = "";

  // Check if rejected list is empty
  if (rejectedList.length === 0) {
    filterSection.innerHTML = `
      <div class="empty-state bg-white flex flex-col items-center justify-center py-12">
        <img src="jobs.png" alt="" class="w-32 h-32 mb-4">
        <p class="text-gray-500 text-lg">No jobs available</p>
        <p class="text-gray-400 text-sm">Check back soon for new job opportunities</p>
      </div>
    `;
    return;
  }

  for (const rejected of rejectedList) {
    const div = document.createElement("div");
    div.className =
      "job-card flex justify-between bg-white p-5 rounded-md shadow shadow-black/50";
    div.innerHTML = `
            <div class="left">
                <h2 class="job-name font-medium text-xl">${rejected.jobName}</h2>
                <p class="job-type text-gray-500 font-medium">${rejected.jobType}</p>
                <p class="job-benefit my-5 text-gray-500"> ${rejected.jobBenefit} </p>
                <p class="job-status bg-red-100 py-1 px-3 rounded text-balance max-w-max mb-2"> ${rejected.status} </p>
                <p id="description" class="description text-gray-500 mb-5"> ${rejected.jobDescription} </p>
                <div class="btn-containe space-x-3">
                    <button
                        class="interview-btn border-green-600 border-2 px-2 py-1 text-green-700"
            >Interview</button>
                    <button
                        class="rejected-btn border-red-600 border-2 px-2 py-1 text-red-700">Rejected</button>
                </div>
            </div>

            <div class="right">
                <button class="delete-btn btn rounded-full shadow w-8 h-8"><i class="fa-regular fa-trash-can"></i></button>
            </div>
        
        `;

    filterSection.appendChild(div);
  }
}

// Initialize the "All" button as selected
allFilterBtn.classList.add("bg-blue-500", "text-white");
