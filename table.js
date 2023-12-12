const fillTable = () => {
    console.log("fillTable");
    const dataList = loadDataLS();
    const table = document.getElementById("booksTable");

    dataList.forEach(element => {
        addRow(table, JSON.parse(element));
    });
};

const addRow = (table, data) => {
    const row = table.insertRow();
    console.log(data);
    console.log(data["arrival"]);
    const properties = ["arrival", "nights", "adults", "childrens", "roomType", "bedType", "smoking", "name", "email", "phone"];

    properties.forEach((property) => {
        const cell = row.insertCell();
        if(property === "smoking") {
            addImage(cell, data[property]);
            return;
        }
        cell.textContent = data[property];
    });

    const actionsCell = row.insertCell();
    const deleteButton = document.createElement('button');
    deleteButton.textContent = 'Eliminar';
    deleteButton.onclick = function () {
        const confirmed = window.confirm('Are you sure you want to remove this item?');
        if (confirmed) {
            table.deleteRow(row.rowIndex);
            deleteItemFromData(JSON.stringify(data));
        }
    };
    actionsCell.appendChild(deleteButton);
}

const addImage = (cell, smoking) => {
    const image = document.createElement('img');
    image.src = smoking === "Yes" ? "cigarette.png" : "!cigarrete.png";
    image.hight = 30;
    image.width = 30;
    cell.appendChild(image);
}