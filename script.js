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
