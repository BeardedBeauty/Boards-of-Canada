$(document).ready(function() {
  // Job input fields
  var $newJobNameInput = $("#jobName");
  var $newJobLocationInput = $("#jobLocation");
  var $newJobTypeInput = $("#jobType");
  var $newJobDetailsInput = $("#jobDetails");
  var $newEmployeeAddInput = $("#employeeAdd");

  // Our new Jobs will go inside the containerTaskList
  var $containerTaskListJobs = $("#containerAllJobs");

  // button click
  $(document).on("click", "#addJobButton", insertJob);

  // button click to send email
  $("#addJobButton").click(function() {
    var to, subject, text;
    to = "worker.taskmaster3000@gmail.com";
    subject = "You have been assigned a new Job";
    text =
      "You have been assigned a new Job.  Please login to your TM3K account to view Job details.";
    $.get("/api/send", { to: to, subject: subject, text: text });
  });

  // Our initial tasktype and jobs array
  var jobs = [];

  // get jobs and output data
  // Getting tasks from database when page loads
  getJobs();

  // This function resets the todos displayed with new todos from the database
  function initializeRowsJobs() {
    $containerTaskListJobs.empty();
    var rowsToAdd = [];
    for (var i = 0; i < jobs.length; i++) {
      rowsToAdd.push(createNewRowJobs(jobs[i]));
    }
    $containerTaskListJobs.prepend(rowsToAdd);
  }

  // This function grabs todos from the database and updates the view
  function getJobs() {
    $.get("/api/jobs", function(data) {
      jobs = data;
      initializeRowsJobs();
    });
  }

  // This function constructs a todo-item row
  function createNewRowJobs(jobs) {
    var $newInputRow = $(
      [
        "<tr>",
        "<td>" + jobs.employee_id + "</td>",
        "<td>" + jobs.location + "</td>",
        "<td>" + jobs.job_desc + "</td>",
        "<td>" + jobs.job_status + "</td>",
        "</tr>"
      ].join("")
    );
    return $newInputRow;
  }

  // This function inserts a new employee into our database and then updates the view
  function insertJob(event) {
    event.preventDefault();
    var Job = {
      name: $newJobNameInput.val().trim(),
      location: $newJobLocationInput.val().trim(),
      tasktype: $newJobTypeInput.val().trim(),
      employee_id: $newEmployeeAddInput.val().trim(),
      job_desc: $newJobDetailsInput.val().trim()
    };
    $.post("/api/jobs/", Job, getJobs);
    $newJobNameInput.val("");
    $newJobLocationInput.val("");
    $newEmployeeAddInput.val("");
    $newJobDetailsInput.val("");
    $newJobLocationInput.val("");
  }
});
