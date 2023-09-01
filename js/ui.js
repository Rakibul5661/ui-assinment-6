const loadData = () =>{
    fetch('https://openapi.programming-hero.com/api/ai/tools')
    .then(res => res.json())
    .then(data => displayAi(data.data.tools))
}

//<-----display data on card------>// 

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

//<----display modal------>//

 const loadDetails = (Id) =>{
     const url = `https://openapi.programming-hero.com/api/ai/tool/${Id}`
    fetch(url)
    .then(res => res.json())
    .then(data => displayDetails(data.data))
 }

//<-----Modal detail----->//

 const displayDetails = (detail) =>{
    // console.log(detail.pricing)
    const detailsDiv = document.getElementById('details');
    detailsDiv.innerHTML = `
    <div style="background-color:#fef7f7; width:48%;" class="border border-danger-subtle p-4 rounded-4">
        <div class="">
            <h5 class="fw-bold pe-4">${detail.description}</h5>
            <div class="d-flex gap-2 justify-content-between my-4">

                <div style="width:30%; background-color:white; font-size:14px;" class="text-center text-success rounded-4 fw-bold d-flex align-items-center p-2 justify-content-center">
                    <p id="first-Plan"></p>
                </div>
                <div style="width:30%; background-color:white; font-size:14px;" class="text-center text-warning rounded-4 fw-bold d-flex align-items-center p-2 justify-content-center">
                    <p id="second-Plan"></p>
                </div>
                <div style="width:30%; background-color:white; font-size:14px;" class="text-center text-danger rounded-4 fw-bold d-flex align-items-center p-2 justify-content-center">
                    <p id="third-Plan"></p>
                </div>

            </div>
            <div class="d-flex justify-content-between g-2">
                <div class="w-50">
                    <h5 class="fw-bold">Features</h5>
                    <ul id="features-list">

                    </ul>
                </div>
                <div style="width:46%;">
                    <h5 class="fw-bold">Integrations</h5>
                    <p id="integration-no-data" class="d-none"></p>
                    <ul id="integrations-list">
                        
                    </ul>
                </div>
            </div>
        </div>
    </div>
    <div style="width:48%;" class="border border-dark-subtle p-4 rounded-4">
        <div>
            <img src="${detail.image_link[0]}" class="card-img-top rounded-4" alt="...">
        </div>
        <div class="pt-4 text-center">
            <h5 id="example-question"></h5>
            <p id="example-answer"></p>
        </div>
    </div>
    `;
//<------ All Plan------>//

    const firstPlan = document.getElementById('first-Plan');
    const secondPlan = document.getElementById('second-Plan');
    const thirdPlan = document.getElementById('third-Plan');
    const allPlan = detail.pricing;
        if(allPlan===null){
            firstPlan.innerHTML = `Free of Cost/ <br>Basic`
            secondPlan.innerHTML = `Free of Cost/ <br>Pro`
            thirdPlan.innerHTML = `Free of Cost/ <br>Enterprise`
        }
        else{
            firstPlan.innerHTML = `${allPlan[0].price} <br> ${allPlan[0].plan}`
            secondPlan.innerHTML = `${allPlan[1].price} <br> ${allPlan[1].plan}`
            thirdPlan.innerHTML = `${allPlan[2].price} <br> ${allPlan[2].plan}`
        }

//<------modal features List------->//

    const featuresList = document.getElementById('features-list');
    const featuresData = detail.features;
        for(const featuresKey in featuresData){
            const feature = featuresData[featuresKey].feature_name;
            const listItem = document.createElement('li');
            listItem.innerText = feature;
            featuresList.appendChild(listItem) 
        }

//------ modal integrations List----->//

    const integrationsList = document.getElementById("integrations-list");
    const integrationsdata = detail.integrations;
        if(integrationsdata===null){
            const integrationNoData = document.getElementById('integration-no-data');
            integrationNoData.classList.remove('d-none');
            integrationNoData.innerText='No data Found';
        }
        else{
            for(const integration of integrationsdata){
                    const listItem = document.createElement("li");
                    listItem.innerText = integration;
                    integrationsList.appendChild(listItem);
            }
        }

//------Modal Input Output Examples----->//

    const EXQPlace = document.getElementById('example-question'); 
    const EXAPlace = document.getElementById('example-answer');
    const QAxamples = detail.input_output_examples;
        if(QAxamples===null){
            EXQPlace.innerText ='Can you give any example?';
            EXAPlace.innerText ='No! Not Yet! Take a break!!!'
        }
        else{
            EXQPlace.innerText =`${detail.input_output_examples[0].input}`;
            EXAPlace.innerText =`${detail.input_output_examples[0].output}`;
        }


 }



loadData()