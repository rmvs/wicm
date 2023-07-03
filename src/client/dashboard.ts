import { getAuthorization } from "./utils";

declare var $: any;

// ${
//   ['ADMIN','OPERATOR'].includes(roleName) ?
//   (
//     `
//     <td class="py-3 px-6 text-center">
//     <div class="flex item-center justify-center">              
//       <!--<div class="w-4 mr-2 transform hover:text-purple-500 hover:scale-110 dark:text-white cursor-pointer">
//         <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewbox="0 0 24 24" stroke="currentColor">
//           <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z"/>
//         </svg>
//       </div>-->
//       <div class="w-4 mr-2 transform hover:text-purple-500 hover:scale-110 dark:text-white cursor-pointer">
//         <!--<svg xmlns="http://www.w3.org/2000/svg" fill="none" viewbox="0 0 24 24" stroke="currentColor">
//           <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"/>
//         </svg>-->
//         <a href="#">
//           <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-6 h-6">
//             <path stroke-linecap="round" stroke-linejoin="round" d="M2.036 12.322a1.012 1.012 0 010-.639C3.423 7.51 7.36 4.5 12 4.5c4.638 0 8.573 3.007 9.963 7.178.07.207.07.431 0 .639C20.577 16.49 16.64 19.5 12 19.5c-4.638 0-8.573-3.007-9.963-7.178z" />
//             <path stroke-linecap="round" stroke-linejoin="round" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
//           </svg>
//         </a>
//       </div>
//     </div>
//   </td>
//     `
//   ): ''

const createStackRow = (index: any,name: any, services: any,roleName: any) => `
<tr class="border-b border-gray-200 hover:bg-gray-100 dark:hover:bg-gray-800">
          <td class="py-3 px-6 text-center dark:text-white">
            <a href="#">${name}</a>
          </td>
          <td class="py-3 px-6 text-center dark:text-white">
            ${services}
          </td>
          <td class="py-3 px-6 text-center dark:text-white">
            <span class="bg-green-200 text-green-600 py-1 px-3 rounded-full text-xs ">Online</span>
          </td>  
</tr>
`;
// <td class="py-3 px-6 text-center">
//             <span class=" {{ loop.index % 2 == 0 ? 'bg-green-200 text-green-600' : (loop.index % 3 == 0 ? 'bg-yellow-200 text-yellow-600' : 'bg-red-200 text-red-600') }} py-1 px-3 rounded-full text-xs">
//               {% if loop.index % 2 == 0 %}
//               Em Execução
//               {% elseif loop.index % 3 == 0 %}
//               Criado
//               {% else %}
//               Parado
//               {% endif %}
//             </span>
//         </td>

// {% if loop.index % 2 == 0 %}
//             <div class="w-4 mr-2 transform hover:text-purple-500 hover:scale-110 dark:text-white cursor-pointer">
//               <svg fill="none" stroke="currentColor" stroke-width="1.5" viewbox="0 0 24 24" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
//                 <path stroke-linecap="round" stroke-linejoin="round" d="M6.75 7.5l3 2.25-3 2.25m4.5 0h3m-9 8.25h13.5A2.25 2.25 0 0021 18V6a2.25 2.25 0 00-2.25-2.25H5.25A2.25 2.25 0 003 6v12a2.25 2.25 0 002.25 2.25z"></path>
//               </svg>
//             </div>
//             {% endif %}
//             {% if loop.index % 2 != 0 %}
//             <div class="w-4 mr-2 transform hover:text-purple-500 hover:scale-110 dark:text-white cursor-pointer">
//               <svg fill="none" stroke="currentColor" stroke-width="1.5" viewbox="0 0 24 24" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
//                 <path stroke-linecap="round" stroke-linejoin="round" d="M5.25 5.653c0-.856.917-1.398 1.667-.986l11.54 6.348a1.125 1.125 0 010 1.971l-11.54 6.347a1.125 1.125 0 01-1.667-.985V5.653z"></path>
//               </svg>
//             </div>
//             {% endif %}
//             {% if loop.index % 2 == 0 %}
//             <div class="w-4 mr-2 transform hover:text-purple-500 hover:scale-110 dark:text-white cursor-pointer">
//               <svg fill="none" stroke="currentColor" stroke-width="1.5" viewbox="0 0 24 24" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
//                 <path stroke-linecap="round" stroke-linejoin="round" d="M14.25 9v6m-4.5 0V9M21 12a9 9 0 11-18 0 9 9 0 0118 0z"></path>
//               </svg>
//             </div>
//             {% endif %}
const createRowServices = (
  id: any,
  name: any,
  image: any,
  createdAt: any,
  endpoints: any,
  host: any,
  replicas: any,
  roleName: any
) => `
<tr id="tr-service-${id}" class="border-b border-gray-200 hover:bg-gray-100 dark:hover:bg-gray-800">
        <td class="break-all py-3 px-6 text-center dark:text-white">
          <a href="#" style="word-break: break-all">${name}</a>
        </td>
        <td class="py-3 px-6 text-center dark:text-white">
          ${image === undefined ? "-" : image}
        </td>
        <td class="py-3 px-6 text-center dark:text-white">
          ${createdAt}
        </td>
        <td class="py-3 px-6 break-normal	text-center dark:text-white">
          ${endpoints === undefined ? "-" : endpoints}
        </td>  
        <td class="py-3 px-6 break-normal	text-center dark:text-white">
          ${host === undefined ? "-" : host}
        </td>   
        <td class="py-3 px-6 break-normal	text-center dark:text-white">
          ${
            replicas === undefined
              ? "-"
              : roleName !== 'GUEST' ? (
                `
                <select id='replicas_${id}' onchange="app.dashBoard.changeReplicas(value,'${id}')" class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500">
                ${Array(5)
                  .fill(1)
                  .map(
                    (value, index) =>
                      `
                    <option class="text-center" ${
                      index + 1 == replicas ? "selected" : ""
                    }>${index + 1}</option>
                `
                  )}
              </select>
                `
              ) : replicas
          }
        </td>   
        ${
          ["ADMIN", "OPERATOR"].includes(roleName)
            ? `
            <td class="py-3 px-6 text-center">        
            <div class="flex item-center justify-center">        
              <!--<a href="/service/${id}" class="w-4 mr-2 transform hover:text-purple-500 hover:scale-110 dark:text-white cursor-pointer"> 
                <svg xmlns="http://www.w3.org/2000/svg" class="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor">
                  <path stroke-linecap="round" stroke-linejoin="round" d="M11.25 11.25l.041-.02a.75.75 0 011.063.852l-.708 2.836a.75.75 0 001.063.853l.041-.021M21 12a9 9 0 11-18 0 9 9 0 0118 0zm-9-3.75h.008v.008H12V8.25z" />
                </svg>            
              </a>-->             
            <div class="w-4 mr-2 transform hover:text-purple-500 hover:scale-110 dark:text-white cursor-pointer" onclick="app.dashBoard.removeService('${id}')">
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewbox="0 0 24 24" stroke="currentColor">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"/>
              </svg>
            </div>
            </div>
          </td>
            `
            : ""
        }
</tr>
`;

const dashBoard = {
  fetchStacks: async (userRole: any = {}) => {
    document.getElementById('tbody-stacks').innerHTML = "";
    document.getElementById('tbody-services').innerHTML = "";    

    const response = await fetch(`${process.env.API_URL}/stacks`, {
      method: "GET",
      credentials: "include",
      headers: {
        'Authorization': getAuthorization()
      }
    });
    const { services = {} } = await response.json();    
    const stacks = services.reduce((list: any[],service: any) => {
      let stack = list.find((value) => value.name === service.Spec.Labels['com.docker.stack.namespace'])
      // service.Spec.Name = service.Spec.Name.replace(service.PreviousSpec.Labels['com.docker.stack.namespace']+'_','')
      if(stack === undefined){
        list.push(stack = { name: service.Spec.Labels['com.docker.stack.namespace'], services: [ service ] })
      }else{
        list = [...list.filter(s => s.name !== stack.name),{...stack, services: [ ...stack.services.filter((s: any) => s.ID !== service.ID), service ]}]
      }
      return list;
     },[])

     createDashboardInfo(stacks)

     if(services.length === 0){
      document.getElementById('tbody-stacks').innerHTML+= `
      <tr>
        <td colspan="3" class="w-full p-5 text-center">Nenhuma stack criada.</td>
      </tr>      
      `
      document.getElementById('tbody-services').innerHTML += `
      <tr>
        <td colspan="6" class="w-full p-5 text-center">Nenhum serviço criado.</td>
      </tr> 
      `

      return;
    }
    

    stacks.forEach((stack: any,index: any) => {
      document.getElementById('tbody-stacks').innerHTML += createStackRow(index,stack.name,stack.services.length,userRole.roleName)
      stack.services.forEach((service: any, index: any) => {
        const endpoints = service.Spec.EndpointSpec?.Ports?.map((s: any) => `*:${s.TargetPort}->${s.PublishedPort}/${s.Protocol}<br/>`).join(',')
        document.getElementById('tbody-services').innerHTML += createRowServices(
          service.ID,
          service.Spec.Name,
          service.Spec.Labels['com.docker.stack.image'] || service.Spec.TaskTemplate.ContainerSpec.Image,
          new Date(service.CreatedAt).toLocaleDateString('pt-BR'),
          endpoints,service.Spec.Labels['traefik.http.routers.users.rule'],
          service.Spec.Mode.Replicated.Replicas, userRole?.roleName)
      })
    })     
    
    
  },
  renderFile: async () => {},
  changeReplicas: async(value: any,id: any) => {
    document.getElementById(`replicas_${id}`).setAttribute('disabled','true')
    try{
      const response = await fetch(`${process.env.API_URL}/services/${id}`,{
        method: 'PATCH',
        headers: {
          'Authorization': getAuthorization(),
          'Content-type': 'application/json; charset=UTF-8'
        },
        body: JSON.stringify({ replicas: value })
      })
      const json = await response.json()
      if(response.status === 200){        
        alert(`O serviço ${id} foi modificado ${value}/${value} réplicas`)        
      }
    }catch(ex){
      alert(ex)
    }finally{
      document.getElementById(`replicas_${id}`).removeAttribute('disabled')
    }
  },
  removeService: async(id: any) => {
    const res = confirm('Você tem certeza que deseja remover este serviço?')
    if(res){
      const response = await fetch(`${process.env.API_URL}/services/${id}`,
      {
        method: 'DELETE',
        headers: {
          'Authorization': getAuthorization()
        },
      })
      if(response.status === 200){
        document.getElementById(`tr-service-${id}`).remove()
        alert('O serviço foi removido')
      }
    }
  }
};

const createDashboardInfo = (stacks: any[]) => {
  document.getElementById('dashboard-items').innerHTML = "";
  const dashboardInfo = [
    {
      path: '#',
      src: 'images/container.png',
      name: 'Contêineres',
      count: stacks.map((s: any) => s.services).reduce((prev: any,act: any) => {
        return prev + act.reduce((prev1: any,act1: any) => {
          return prev1 + act1.Spec.Mode.Replicated.Replicas
        },0)
      },0)
    },
    {
      path: '#',
      src: 'images/docker-service.png',
      name: 'Serviços',
      count: stacks.map((s: any) => s.services).reduce((prev: any,act: any) => {
        return prev + act.length
      },0)
    },
    {
      path: '#',
      src: 'images/pack.svg',
      name: 'Stacks',
      count: stacks.length
    }
  ]
  dashboardInfo.forEach((dash: any) => {
    document.getElementById('dashboard-items').innerHTML += `
      <a href="${dash.path}" class="group sm:w-4/6 overflow-hidden rounded-lg hover:opacity-60">
      <div class="">
          <img src="${dash.src}" alt="" class="h-full dark:invert w-full object-cover object-center">        
          <!--<div class="h-full dark:text-white text-black w-full object-cover object-center">
            ${dash.icon}
          </div>-->
      </div>
      <h3 class="mt-4 text-xl text-center dark:text-slate-400">${dash.count} ${dash.name}
      </h3>
      </a>
    `
  }) 
}

export default dashBoard;
