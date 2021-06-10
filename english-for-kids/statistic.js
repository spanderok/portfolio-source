
export function sortStatistic() {
        const table = document.querySelector('table');

        let prevSort = null;

            const tableHead = table.rows[0];
            tableHead.addEventListener('click', function() {

                const indexTHeadCell = Array.from(tableHead.cells).indexOf(event.target);
                prevSort !== indexTHeadCell ? sortUp(indexTHeadCell) : sortDown(indexTHeadCell);
                
            })

        function sortUp(n) {
            let sortedRows = Array.from(table.rows)
            .slice(1)
            .sort((rowA, rowB) => rowA.cells[n].innerHTML > rowB.cells[n].innerHTML ? 1 : -1);
      
          table.append(...sortedRows);
          prevSort = n;
        }

        function sortDown(n) {
            let sortedRows = Array.from(table.rows)
            .slice(1)
            .sort((rowA, rowB) => rowA.cells[n].innerHTML < rowB.cells[n].innerHTML ? 1 : -1);
      
          table.append(...sortedRows);
          prevSort = null;
        }
}