import validate from "validate.js";

import { toFadeIn, toFadeOut } from "../header/header.js";

window.addEventListener("DOMContentLoaded", function () {

    let regModal = this.document.querySelector(".modal_registration"),
        autorizModal = this.document.querySelector(".modal_autorization"),
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
        validate.validators.presence.options = { message: "^Обязательно к заполнению" };
        validate.validators.email.options = { message: "^Введите корректный Email" };

        let regForm = this.document.getElementById("reg-form"),
            enterForm = this.document.getElementById("enter-form"),
            regInputs = regForm.querySelectorAll("input"),
            enterInputs = enterForm.querySelectorAll("input"),
            errorBox = regForm.querySelectorAll(".modal__error-box"),
            userErrBox = regForm.querySelectorAll(".modal__error-box")[0],
            sernameErrBox = regForm.querySelectorAll(".modal__error-box")[1],
            phoneErrBox = regForm.querySelectorAll(".modal__error-box")[2],
            mailErrBox = regForm.querySelectorAll(".modal__error-box")[3],
            companyErrBox = regForm.querySelectorAll(".modal__error-box")[4],
            residentsErrBox = regForm.querySelectorAll(".modal__error-box")[5];
            
        regInputs.forEach((item) => {
            item.addEventListener("change", () => {
                let nameVal = validate.collectFormValues(regForm).user,
                    sernameVal = validate.collectFormValues(regForm).sername,
                    phoneVal = validate.collectFormValues(regForm).phone,
                    mailVal = validate.collectFormValues(regForm).mail,
                    companyVal = validate.collectFormValues(regForm).company,
                    residentsVal = validate.collectFormValues(regForm).residents,
                    inputValues = {
                        user : nameVal,
                        sername : sernameVal,
                        phone : phoneVal,
                        mail : mailVal,
                        company : companyVal,
                        residents : residentsVal
                    },
                    constraints = {
                        user: {
                            presence: true
                        },
                        sername: {
                            presence: true,
                        },
                        phone: {
                            presence: true,
                        },
                        mail: {
                            presence: true,
                        },
                        company: {
                            presence: true,
                        },
                        residents: {
                            presence: true,
                        },
                    },
                    validationResult = validate(inputValues, constraints);

                let setErrors = () => {
                    errorBox.forEach((item) => item.style.display = "block");
                    userErrBox.textContent = validationResult.user;
                    sernameErrBox.textContent = validationResult.sername;
                    phoneErrBox.textContent = validationResult.phone;
                    mailErrBox.textContent = validationResult.mail;
                    companyErrBox.textContent = validationResult.company;
                    residentsErrBox.textContent = validationResult.residents;
                };

                if(validationResult) {
                    setErrors();
                } else {
                    errorBox.forEach((item) => {
                        item.style.display = "none";
                        item.textContent = "";
                    });
                    console.log("submit");
                }
            });
        });

        enterInputs.forEach((item) => {
            item.addEventListener("change", () => {
                
            });
        });
    };

    setForm();
});