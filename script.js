let interviewList = [];
let rejectedList = [];
let currentStatus = "all";

// Initialize Dashboard Counter
const total = document.getElementById("total");
const interview = document.getElementById("interview");
const rejected = document.getElementById("rejected");

// Initialize job card counter  variable
let interviewCount = 0;
let rejectedCount = 0;

const allCardSection = document.getElementById("all-cards-section");
const mainSection = document.querySelector("main");
const filterSection = document.getElementById("filter-section");
console.log(mainSection);

// Initialize job counter
const Jobcounter = document.getElementById("total-job-counter");
const totalJobsNumber = allCardSection.children.length;

Jobcounter.innerHTML = `
${totalJobsNumber} Jobs
`;
console.log(Jobcounter);

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

    Jobcounter.innerHTML = `
        ${totalJobsNumber} Jobs
         `;
    console.log(Jobcounter);
  }
}



// Create interview card  in the interview filter section
function renderInterview() {
  filterSection.innerHTML = "";
  for (const interview of interviewList) {
    const div = document.createElement("div");
    div.className =
      "job-card flex justify-between bg-white p-5 rounded-md shadow shadow-black/50";
    div.innerHTML = `
            <div class="left">
                <h2 class="job-name font-medium text-xl">${interview.jobName}</h2>
                <p class="job-type text-gray-500 font-medium">${interview.jobType}</p>
                <p class="job-benefit my-5 text-gray-500"> ${interview.jobBenefit} </p>
                <p class="job-status bg-blue-100 py-1 px-3 rounded text-balance max-w-max mb-2"> ${interview.status} </p>
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
  for (const rejected of rejectedList) {
    const div = document.createElement("div");
    div.className =
      "job-card flex justify-between bg-white p-5 rounded-md shadow shadow-black/50";
    div.innerHTML = `
            <div class="left">
                <h2 class="job-name font-medium text-xl">${rejected.jobName}</h2>
                <p class="job-type text-gray-500 font-medium">${rejected.jobType}</p>
                <p class="job-benefit my-5 text-gray-500"> ${rejected.jobBenefit} </p>
                <p class="job-status bg-blue-100 py-1 px-3 rounded text-balance max-w-max mb-2"> ${rejected.status} </p>
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
