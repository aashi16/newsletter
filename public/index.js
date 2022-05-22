//To Avoid window pollution
(() => {
  const dropdowns = document.getElementsByClassName("dropdown");
  const submitBtn = document.querySelector("button");
  const emailText = document.querySelector(".email-message");
  const nameText = document.querySelector(".name-message");
  const modalBg = document.querySelector(".modal-background");
  const modal = document.querySelector(".modal");
  const closeBtn = document.querySelector(".close");
  const formName = document.querySelector("input[name=name]");
  const formEmail = document.querySelector("input[name=email]");
  const timeSelected = document.querySelector(".time .dropdown-text");
  const langSelected = document.querySelector(".language .dropdown-text");
  let emailValidationChecker = false;
  let nameValidationChecker = false;
  let userInfo = [];
  let prefLang = ["en-US", "en-GB"];
  let prefTime = ["Monday Morning", "Wednesday Morning", "Sunday Evening"];

  // This function will add the list of items to the dropdown
  function addDropdownList(list) {
    let html = ``;
    for (let text of list) {
      html += `<div class="content-item" tabindex="0" id="option-${text}">${text}</div>`;
    }
    return html;
  }
  // Common function to add dropdown content for each dropdown
  for (let item of dropdowns) {
    const dropdownText = item.querySelector(".dropdown-text");
    dropdownText.addEventListener("click", () => {
      const content = item.querySelector(".dropdown-content");
      if (content.classList.contains("show")) {
        content.classList.remove("show");
        return;
      }
      let dropdownContents =
        document.getElementsByClassName("dropdown-content");
      for (let content of dropdownContents) {
        content.classList.remove("show");
      }
      let preferredData = item.classList.contains("time") ? prefTime : prefLang;
      content.innerHTML = addDropdownList(preferredData);
      content.classList.toggle("show");
      const contentItem = content.getElementsByClassName("content-item");
      for (let item of contentItem) {
        item.addEventListener("click", function () {
          dropdownText.innerHTML = item.innerHTML;
        });
      }
    });
  }
  //Name Validation function
  function inputName(e) {
    const input = e.target.value;
    //Only alphabets are allowed (Adding Number or special character will give error message)
    let nameValidation = input && /^[a-zA-Z][a-zA-Z ]*$/.test(input);
    nameText.textContent =
      nameValidation || input === ""
        ? ""
        : "Please input alphabet characters only";
    if (nameValidation || input === "") {
      formName.classList.add("valid");
      formName.classList.remove("invalid");
      nameValidationChecker = true;
      if (emailValidationChecker) {
        submitBtn.removeAttribute("disabled", "");
        submitBtn.classList.remove("disabled");
      }
    } else {
      formName.classList.remove("valid");
      formName.classList.add("invalid");
      nameValidationChecker = false;
      submitBtn.setAttribute("disabled", "");
      submitBtn.classList.add("disabled");
    }
  }
  //Email Validation function.
  function inputEmail(e) {
    const input = e.target.value;
    let emailValidation = input && /(^\w.*@\w+\.\w)/.test(input);
    emailText.textContent = emailValidation
      ? ""
      : "Please add a valid email id";
    if (emailValidation) {
      const ele = userInfo.find((item) => item.email === formEmail.value);
      if (ele) {
        emailText.textContent = "This email address is already being used";
        submitBtn.setAttribute("disabled", "");
        submitBtn.classList.add("disabled");
        formEmail.classList.add("invalid");
        formEmail.classList.remove("valid");
        return;
      }
      formEmail.classList.add("valid");
      formEmail.classList.remove("invalid");
      emailValidationChecker = true;
      if (formName === "" || nameValidationChecker) {
        submitBtn.removeAttribute("disabled");
        submitBtn.classList.remove("disabled");
      }
    } else {
      formEmail.classList.remove("valid");
      formEmail.classList.add("invalid");
      emailValidationChecker = false;
      submitBtn.setAttribute("disabled", "");
      submitBtn.classList.add("disabled");
    }
  }
  formName.addEventListener("input", inputName);
  formEmail.addEventListener("input", inputEmail);

  function addUserData() {
    let data = {};
    data["name"] = formName.value;
    data["email"] = formEmail.value;
    data["language"] = langSelected.innerHTML;
    data["time"] = timeSelected.innerHTML;
    userInfo.push(data);
  }
  const refreshForm = function () {
    formName.value = "";
    formEmail.value = "";
    timeSelected.innerHTML = "Monday Morning";
    langSelected.innerHTML = "en-GB";
    submitBtn.setAttribute("disabled", "");
    submitBtn.classList.add("disabled");
  };

  const postUserData = async function () {
    let user = {
      userEmail: formEmail.value,
      userName: formName.value,
      selectedLanguage: langSelected.innerHTML,
      selectedTime: timeSelected.innerHTML,
    };
    return await fetch("http://localhost:8080/", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        user,
      }),
    });
  };
  submitBtn.addEventListener("click", (e) => {
    e.preventDefault();
    if (formEmail.value !== "" && emailValidationChecker) {
      addUserData();
      modal.classList.add("show");
      modalBg.classList.add("show");
    } else {
      formEmail.classList.add("invalid");
      emailText.textContent = "Please add a valid email id";
    }
    postUserData();
  });
  window.addEventListener("click", function (event) {
    if (!event.target.matches(".dropdown-text")) {
      var dropdownContent = document.getElementsByClassName("dropdown-content");
      var i;
      for (i = 0; i < dropdownContent.length; i++) {
        var openDropdown = dropdownContent[i];
        if (openDropdown.classList.contains("show")) {
          openDropdown.classList.remove("show");
        }
      }
    }
  });

  // Modal
  function closeModal() {
    modal.classList.remove("show");
    modal.classList.add("hide");
    modalBg.classList.add("hide");
    modalBg.classList.remove("show");
    refreshForm();
  }
  modalBg.addEventListener("click", (e) => {
    e.preventDefault();
    closeModal();
  });
  closeBtn.addEventListener("click", () => closeModal());
})();
