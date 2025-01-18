import validate from "validate.js";

import { toFadeIn, toFadeOut } from "../header/header.js";

window.addEventListener("DOMContentLoaded", function () {

    let modal = this.document.querySelectorAll(".modal"),
        regModal = this.document.querySelector(".modal_registration"),
        autorizModal = this.document.querySelector(".modal_autorization"),
        regForm = this.document.getElementById("reg-form"),
        enterForm = this.document.getElementById("enter-form"),
        enter = this.document.querySelector(".header__enter"),
        regItem = this.document.querySelector(".header__heart"),
        close = this.document.querySelectorAll(".modal-window__close");

    let setModal = (launchItem, launchParentClass, modalType, activeClass) => {

        let closeOver = (e) => {
            if (e.target.closest(".modal-window") || e.target.closest(launchParentClass)) {
                return;
            }
            toFadeOut(modalType, activeClass);
            document.removeEventListener("click", closeOver);
        };

        launchItem.addEventListener("click", (e) => {
            if (e.target.closest(launchParentClass)) {
                modalType.classList.add(activeClass);

                if (modalType.classList.contains(activeClass)) {
                    setTimeout(() => document.addEventListener("click", closeOver));
                    toFadeIn(modalType);
                } else {
                    toFadeOut(modalType, activeClass);
                    document.removeEventListener("click", closeOver);
                }
            }
        });

        close.forEach((item) => {
            item.addEventListener("click", () => {
                toFadeOut(modalType, activeClass);
            });
        });
    };

    setModal(enter, (".header__enter"), autorizModal, ("modal_registration_active"));
    setModal(regItem, (".header__heart"), regModal, ("modal_autorization_active"));

    let setForm = () => {

        let regInputs = regForm.querySelectorAll("input"),
            enterInputs = enterForm.querySelectorAll("input"),
            errorBox = this.document.querySelectorAll(".modal__error-box"),
            userErrBox = regForm.querySelectorAll(".modal__error-box")[0],
            sernameErrBox = regForm.querySelectorAll(".modal__error-box")[1],
            phoneErrBox = regForm.querySelectorAll(".modal__error-box")[2],
            mailErrBox = regForm.querySelectorAll(".modal__error-box")[3],
            companyErrBox = regForm.querySelectorAll(".modal__error-box")[4],
            residentsErrBox = regForm.querySelectorAll(".modal__error-box")[5],
            phoneNmailErrBox = enterForm.querySelectorAll(".modal__error-box")[0],
            passwordErrBox = enterForm.querySelectorAll(".modal__error-box")[1],
            numInput = regForm.querySelector("input[name='phone']");

        numInput.addEventListener("change", () => {
            numInput.value = numInput.value.replace(/[^0-9]/g, "");
        });

        let getValidationResult = () => {
            validate.validators.presence.options = { message: "^Обязательно к заполнению" };
            validate.validators.email.options = { message: "^Введите корректный Email" };

            let nameVal = validate.collectFormValues(regForm).user,
                sernameVal = validate.collectFormValues(regForm).sername,
                phoneVal = validate.collectFormValues(regForm).phone,
                mailVal = validate.collectFormValues(regForm).mail,
                companyVal = validate.collectFormValues(regForm).company,
                residentsVal = validate.collectFormValues(regForm).residents,

                phoneNmailVal = validate.collectFormValues(enterForm).phoneNmail,
                passwordVal = validate.collectFormValues(enterForm).pass,

                inputValues = {
                    user: nameVal,
                    sername: sernameVal,
                    phone: phoneVal,
                    mail: mailVal,
                    company: companyVal,
                    residents: residentsVal,
                    phoneMail: phoneNmailVal,
                    password: passwordVal
                },
                constraints = {
                    user: {
                        presence: true,
                        length: {
                            minimum: 2,
                            maximum: 40,
                            message: "^Введите от 2 до 40 символов"
                        }
                    },
                    sername: {
                        presence: true,
                        length: {
                            minimum: 2,
                            maximum: 40,
                            message: "^Введите от 2 до 40 символов"
                        }
                    },
                    phone: {
                        presence: true,
                        length: {
                            minimum: 10,
                            maximum: 13,
                            message: "^Укажите корректный номер телефона"
                        },
                        numericality: {
                            onlyInteger: true,
                            message: "^Укажите корректный номер телефона"
                        },
                    },
                    mail: {
                        presence: true,
                        email: true,
                    },
                    company: {
                        presence: true,
                        length: {
                            minimum: 2,
                            maximum: 40,
                            message: "^Введите от 2 до 40 символов"
                        }
                    },
                    residents: {
                        presence: true,
                    },
                    phoneMail: {
                        presence: true,
                    },
                    password: {
                        presence: true,
                        length: {
                            minimum: 6,
                            message: "^Пароль должен содержать не меньше 6 символов"
                        }
                    }
                },
                result = validate(inputValues, constraints);

            return result;
        };

        let setErrors = () => {
            let validationResult = getValidationResult();

            errorBox.forEach((item) => item.style.display = "block");
            userErrBox.textContent = validationResult.user;
            sernameErrBox.textContent = validationResult.sername;
            phoneErrBox.textContent = validationResult.phone;
            mailErrBox.textContent = validationResult.mail;
            companyErrBox.textContent = validationResult.company;
            residentsErrBox.textContent = validationResult.residents;
            phoneNmailErrBox.textContent = validationResult.phoneMail;
            passwordErrBox.textContent = validationResult.password;

        };


        let toSubmitForm = (form, url) => {
            form.addEventListener("submit", (e) => {
                e.preventDefault();
                let validationResult = getValidationResult();

                if (validationResult) {
                    setErrors();
                    return;
                }

                let formData = new FormData(form),
                    request = new XMLHttpRequest(formData);

                request.open("POST", url);
                request.send();

                request.addEventListener("readystatechange", () => {
                    if (request.readyState === 4 && request.status == 200) {
                        modal.forEach((item) => {
                            item.style.display = "none";
                        });
                        form.reset();
                        alert("Спасибо!");

                    } else if (request.readyState < 4) {
                        alert("Отправка данных...");

                    } else {
                        alert("Что то пошло не так");
                    }
                });
            });
        };

        toSubmitForm(regForm);
        toSubmitForm(enterForm);

        let setInputs = (inputs) => {
            inputs.forEach((item) => {
                item.addEventListener("change", () => {
                    let validationResult = getValidationResult();

                    if (validationResult) {
                        setErrors();
                    } else {
                        errorBox.forEach((item) => {
                            item.style.display = "none";
                            item.textContent = "";
                        });
                    }
                });
            });
        };

        setInputs(regInputs, enterInputs);
    };

    setForm();
});