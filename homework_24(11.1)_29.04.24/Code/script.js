const tableSectionId = 'multiplic-table-section';


(function createHtmlMultiplicTable(tableSection) {

    const sectionForInsertTable = document.getElementById(tableSection);
    const newTable = document.createElement('table');

    sectionForInsertTable.appendChild(newTable);

    for (let i = 0; i < 10; i++) {
        let newTr = document.createElement('tr');

        newTable.appendChild(newTr);

        for (let j = 0; j < 10; j++) {
            let newTd = document.createElement('td');

            newTable.children[i].appendChild(newTd);
            newTable.children[i].children[j].innerText = (i + 1) * (j + 1);
        }
    }
})(tableSectionId);