const loadData = () =>{
    fetch('https://openapi.programming-hero.com/api/ai/tools')
    .then(res => res.json())
    .then(data => displayAi(data.data.tools))
}

// display data on card 

const displayAi = (allAi) =>{
    const cardDiv = document.getElementById('ai-card');
    allAi.forEach(ai => {
        // console.log(ai.id)
        const card = document.createElement('div');
        card.classList.add('col')
        card.innerHTML = `
            <div class="card">
                <div style="height:200px;" class="p-4">
                    <img src="${ai.image}" class="card-img-top rounded-3 img-fluid " alt="..."> 
                </div>
                <div class="card-body">
                    <div class="border-bottom mb-4">
                        <h5>Features</h5>
                        <ul>
                            <li>${ai.features[0]}</li>
                            <li>${ai.features[1]}</li>
                            <li>${ai.features[2]}</li>
                        </ul>
                    </div>
                    <div class="d-flex justify-content-between align-items-center">
                        <div>
                            <h5 class="card-title">${ai.name}</h5>
                            <p>📅 ${ai.published_in}</p>
                        </div>
                        <div>
                            <button onclick="loadDetails('${ai.id}')" class="rounded-circle" data-bs-toggle="modal" data-bs-target="#show-details">→</button>
                        </div>
                    </div>
                </div>
            </div>
        `;
        cardDiv.appendChild(card)
    });
}

// display modal
 const loadDetails = (Id) =>{
     const url = `https://openapi.programming-hero.com/api/ai/tool/${Id}`
    fetch(url)
    .then(res => res.json())
    .then(data => displayDetails(data.data))
 }

 const displayDetails = (detail) =>{
    console.log(detail.pricing)
    const detailsDiv = document.getElementById('details');
    detailsDiv.innerHTML = `
    <div style="background-color:#fef7f7; width:48%;" class="border border-danger-subtle p-4 rounded-4">
        <div class="">
            <h6 class="fw-bold">${detail.description}</h6>
            <div class="d-flex gap-2 justify-content-between my-4">
                <div style="width:30%; background-color:white; font-size:14px;" class="text-center text-success rounded-4 fw-bold d-flex align-items-center p-2 justify-content-center"><p></p></div>
                <div style="width:30%; background-color:white; font-size:14px;" class="text-center text-warning rounded-4 fw-bold d-flex align-items-center p-2 justify-content-center"><p></p></div>
                <div style="width:30%; background-color:white; font-size:14px;" class="text-center text-danger rounded-4 fw-bold d-flex align-items-center p-2 justify-content-center"><p></p></div>
            </div>
            <div class="d-flex justify-content-between g-2">
                <div class="w-50">
                    <h6 class="fw-bold">Features</h6>
                    <ul id="features-list">

                    </ul>
                </div>
                <div style="width:46%;">
                    <h6 class="fw-bold">Integrations</h6>
                    <ul id="integrations-list">
                        
                    </ul>
                </div>
            </div>
        </div>
    </div>
    <div style="width:48%;" class="border-0">
        <img src="" class="card-img-top" alt="...">
        <div class="card-body">
            <h5 class="card-title">Card title</h5>
            <p class="card-text">This card has supporting text below as a natural lead-in to additional content.</p>
            <p class="card-text"><small class="text-body-secondary">Last updated 3 mins ago</small></p>
        </div>
    </div>
    `;
    

    const featuresList = document.getElementById('features-list');
    const featuresData = detail.features;
    for(const featuresKey in featuresData){
        const feature = featuresData[featuresKey].feature_name;
        const listItem = document.createElement('li');
        listItem.innerText = feature;
        featuresList.appendChild(listItem) 
    }

    const integrationsList = document.getElementById("integrations-list");
    const integrationsdata = detail.integrations;
    for(const integration of integrationsdata){
            const listItem = document.createElement("li");
            listItem.innerText = integration;
            integrationsList.appendChild(listItem);
    }

 }



loadData()