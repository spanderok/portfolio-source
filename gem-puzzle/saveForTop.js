//let arrAllSavedCounts = [2,5,3,7,9,46,67,54,32,34,34,34,54,32,345,32,5,7,4,22,35,1,3,2,4,3,6];
let top10Pays;
//функция сортировки и отбора результатов 10 лучших завершенных игр
function top10Saved (arrAllSavedCounts) {
    //убираем повторяющиеся
    let arr_2 = arrAllSavedCounts.reduce((result, item) => {
        return result.includes(item) ? result : [... result, item];
    }, []);
    console.log('del repeat',arr_2 );
    
    //сорт по порядку
    arr_2.sort(function (a, b) {
        return a - b;
    })
    console.log(arr_2);

    //обрезаем
    top10Pays = arr_2.slice(0,10);

    console.log(top10Pays);

    return top10Pays;
};
//console.log(top10Pays);




 
 
 

