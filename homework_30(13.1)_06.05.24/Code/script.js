"use strict";

function createEl({type = "div", content, attributes}) {
    const $el = document.createElement(type);

    if (content)
        $el.textContent = content;

    if (attributes) {
        Object.entries(attributes).forEach(([key, value]) => {

            if (key !== "style" && typeof value !== "object")
                return $el.setAttribute(key, value);

            Object.entries(value).forEach(([styleKey, styleValue]) => {
                $el.style[styleKey] = styleValue;
            });
        });
    }

    return $el;
}

const formSummaryObj = {
    fName: "",
    lName: "",
    message: "",
    email: "",
    phone: "",
};

const regexName = new RegExp('^[a-z]{2,30}$', 'i');
const regexMessage = new RegExp('^(\\w+.?\\s?){5,}(.*\\s*)*');
const regexPhone = new RegExp('^\\+38((\\(0\\d\\d\\))|(0\\d\\d))\\d{7}$');
const regexEmail = new RegExp('^(([a-z0-9][-_\.]?)+[a-z0-9])+@(([a-z0-9]-?)+[a-z0-9])+\\.[a-z]{2,5}$', 'i');

const errorMessages = {
    fName: "Please enter valid first name",
    lName: "Please enter valid last name",
    message: "Message must be at least 5 characters long",
    email: "Email must be in the format mail@mail.mail",
    phone: "Phone number must be in the format +38(0XX)XXXXXXX"
}

const contactForm = document.forms.contactForm;

contactForm.addEventListener('submit', (e) => {

    let isValid = true;

    for (const key in formSummaryObj) {
        if (!formSummaryObj[key]) {
            isValid = false;
            break;
        }
    }

    if (isValid) {
        confirmationSendingHtmlOutput(contactForm.parentElement);
    }

    e.preventDefault();
});

function confirmationSendingHtmlOutput(root) {

    root.querySelector('form').remove();

    const successTextBlock = createEl({
        type: "div",
        content: "Your message has been sent!",
        attributes: {class: "h3 success-block"}
    });

    root.append(successTextBlock);

    const resultTable = createEl({
        type: "table",
        content: "",
        attributes: {class: "table"}
    });

    let tableFragment = document.createDocumentFragment();

    for (const key in formSummaryObj) {
        const tr = createEl({type: "tr"});
        const td1 = createEl({
            type: "td",
            content: key
        });
        const td2 = createEl({
            type: "td",
            content: formSummaryObj[key]
        });

        tr.append(td1);
        tr.append(td2);
        tableFragment.append(tr);
    }

    resultTable.append(tableFragment);
    root.append(resultTable);
}

function validateFormElementValue(value, regEx) {

    return regEx.test(value) ? value : false;

}

contactForm.addEventListener('focusout', (e) => {

    if (e.target.parentElement.lastChild.className === 'error')
        e.target.parentElement.lastChild.remove();

    switch (e.target.name) {
        case 'fName': {
            formSummaryObj.fName = validateFormElementValue(e.target.value, regexName);

            if (!formSummaryObj.fName)
                createError(e.target.parentElement, errorMessages[e.target.name]);

            break;
        }
        case 'lName': {
            formSummaryObj.lName = validateFormElementValue(e.target.value, regexName);

            if (!formSummaryObj.lName)
                createError(e.target.parentElement, errorMessages[e.target.name]);

            break;
        }
        case 'message': {
            formSummaryObj.message = validateFormElementValue(e.target.value, regexMessage);

            if (!formSummaryObj.message)
                createError(e.target.parentElement, errorMessages[e.target.name]);

            break;
        }
        case 'email': {
            formSummaryObj.email = validateFormElementValue(e.target.value, regexEmail);

            if (!formSummaryObj.email)
                createError(e.target.parentElement, errorMessages[e.target.name]);

            break;
        }
        case 'phone': {
            formSummaryObj.phone = validateFormElementValue(e.target.value, regexPhone);

            if (!formSummaryObj.phone)
                createError(e.target.parentElement, errorMessages[e.target.name]);

            break;
        }
    }
});

function createError(rootForInsertErr, message) {

    if (rootForInsertErr.lastChild.className !== 'error') {
        let errorEl = createEl({
            type: 'div',
            content: message,
            attributes: {class: 'error'}
        });

        rootForInsertErr.append(errorEl);
    }

}



