const handleSubmit = (event) => {
    event.preventDefault();

    if(!handleError()) return;

    const formData = {
        arrival: document.getElementById("arrival").value,
        nights: document.getElementById("nights").value,
        adults: document.getElementById("adults").value,
        childrens: document.getElementById("childrens").value,
        roomType: getRoomType(),
        bedType: getBetType(),
        smoking: document.getElementById("smoking").checked ? "Yes" : "No",
        name: document.getElementById("name").value,
        email: document.getElementById("email").value,
        phone: document.getElementById("phone").value,
    }

    const formDataJson = JSON.stringify(formData);

    const dataList = loadDataLS();
    dataList.push(formDataJson);

    saveDataLS(dataList);
};

const saveDataLS = (dataList) => {
    localStorage.setItem("formData", JSON.stringify(dataList));
}

const loadDataLS = () => {
    const dataList = JSON.parse(localStorage.getItem("formData")) || [];
    return dataList;
}

const deleteItemFromData = (item) => {
    const dataList = loadDataLS();
    const index = dataList.indexOf(item);
    dataList.splice(index, 1);
    saveDataLS(dataList);
};

const handleError = () => {
    const flag = true;
    console.log("handleError");
    const invalidTypeInputs = ["checkbox", "radio", "button", "submit", "reset", "fieldset", "select"];
    const inputs = getInputs(invalidTypeInputs);

    removeErrorMessages(inputs);

    inputs.forEach(input => {
        const inputId = input.id;
        const errorMessage = document.getElementById(`${inputId}Error`);
        errorMessage.textContent = input.validationMessage;
        if(input.validationMessage) {
            flag = false;
        }
    });

    return flag;
};

const removeErrorMessages = (inputs) => {
    inputs.forEach(input => {
        const inputId = input.id;
        const errorMessage = document.getElementById(`${inputId}Error`);
        errorMessage.innerHTML = "";
    });
};

const getInputs = (invalidTypeInputs) => {
    const allInputs = document.querySelectorAll("input");
    const filteredInputs = [...allInputs].filter(input => !invalidTypeInputs.includes(input.type));
    return filteredInputs;
};

const getRoomType = () => {
    const roomTypes = document.getElementsByName("roomType");
    const roomType = [...roomTypes].find(roomType => roomType.checked);
    return roomType.value;
};

const getBetType = () => {
    const bedTypes = document.getElementsByName("bedType");
    const bedType = [...bedTypes].find(bedType => bedType.checked);
    return bedType.value;
};