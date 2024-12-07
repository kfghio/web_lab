let isFirstRequest = true;

const apiUrl = "https://reqres.in/api/unknown"; 
const content = document.querySelector("#content");
const preloader = document.querySelector("#preloader");
const retryButton = document.querySelector("#retry-button");

const getRandomQuery = () => {
    return ""; 
};
const sleep = (ms) => new Promise(resolve => setTimeout(resolve, ms));
const fetchData = async () => {
    try {
        preloader.style.display = "block";
        content.innerHTML = "";
        await sleep(2000); 

        const response = await fetch(apiUrl + getRandomQuery());
        if (!response.ok) {
            throw new Error(`Ошибка: ${response.status}`);
        }

        const data = await response.json();

        preloader.style.display = "none";

        const filteredData = filterData(data.data);

        renderData(filteredData);
    } catch (error) {
        preloader.style.display = "none";
        content.innerHTML = `<div class="error">Что-то пошло не так: ${error.message}</div>`;
    }
};

const filterData = (data) => {
    const random = Math.random(); 

    if (random > 0.5) {
        return data.filter(item => item.id > 3);
    } else {
        return data.filter(item => item.id <= 3);
    }
};

const renderData = (data) => {
    if (!data || data.length === 0) {
        content.innerHTML = "<div>Данных нет</div>";
        return;
    }

    content.innerHTML = data
        .map(
            (item) => `
        <div class="color-info">
            <h3>${item.name}</h3>
            <p><b>Год:</b> ${item.year}</p>
            <p><b>Цвет:</b> <span style="background-color:${item.color}; color:white;">${item.color}</span></p>
            <p><b>Pantone:</b> ${item.pantone_value}</p>
        </div>`
        )
        .join("");
};

retryButton.addEventListener("click", fetchData);

fetchData();
