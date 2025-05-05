

    (async ()=> {

        const menu = document.querySelector('#menu-items')
        
        const getMenu = async () => {

            const response = await fetch('/api/v1/menu')
            const json = await response.json()
            
            json.forEach(({name, description, price, url}) => {
                const div = document.createElement('div')
                const h2 = document.createElement('h2')
                    h2.textContent = name

                const p = document.createElement('p')
                    p.textContent = description
                
                const span = document.createElement('span')
                    span.textContent = price

                const img = document.createElement('img')
                    img.src = url
                    
                    div.appendChild(h2)
                    div.appendChild(p)
                    div.appendChild(span)
                    div.appendChild(img)

                menu.appendChild(div)
            }); 
        }
        getMenu()

        const events = document.querySelector('#event-list')

        const getEvents = async () => {

            const response = await fetch('/api/v1/events')
            const json = await response.json()
            
            json.forEach(({_id, name, location, date, time}) => {
                const div = document.createElement('div')
                const h2 = document.createElement('h2')
                    h2.innerHTML = `<a href ="#" class="brown" onclick="event.preventDefault();showEventDetails('${_id}'); return false;">${name}</a>`

                const span = document.createElement('span')
                    span.textContent = location
                
                const span2 = document.createElement('span')
                    span2.textContent = date

                const span3 = document.createElement('span')
                    span3.textContent = time
                    
                    const br1 = document.createElement("br");
                    const br2 = document.createElement("br");
                    const br3 = document.createElement("br");
                    div.appendChild(h2)
                    div.appendChild(span)
                    div.appendChild(br2)
                    div.appendChild(span2)
                    div.appendChild(br3)
                    div.appendChild(span3)

                events.appendChild(div)
            }); 
        }
        getEvents()
            
       

        const closeButton = document.querySelector(".close-button")
       
        if (closeButton!=null){
            closeButton.onclick = () => {
                const modal = document.getElementById("eventModal")
                modal.style.display = 'none'
            }

            window.onclick = event => {
                const modal = document.getElementById("eventModal")
                if (event.target === modal) modal.style.display = 'none'
    
            }
        }



    })()

    document.getElementById('menu-form').addEventListener('submit', async (e) => {
        e.preventDefault(); 
        const form = e.target; 
      
        const data = {
          name: form.name.value,
          description: form.description.value,
          price: parseFloat(form.price.value),
          url: form.imageUrl.value
        };

        await fetch('/api/v1/menu', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(data)
          });
      
          alert('Menu Item Added!');
          form.reset();
       
      });
      



      document.getElementById('event-form').addEventListener('submit', async (e) => {
        e.preventDefault();
      
        const form = e.target;
        const data = {
          name: form.name.value,
          location: form.location.value,
          date: form.date.value,
          time: form.time.value
        };
        await fetch('/api/v1/events', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(data)
          });
      
          alert('Event added!');
          form.reset();
       
      });

    
    const showEventDetails = async id => {
        const modal = document.getElementById("eventModal")
        const modalElements = {
            name: document.getElementById('modalName'),
            location: document.getElementById('modalLocation'),
            date: document.getElementById('modalDate'),
            time: document.getElementById('modalTime')
        }
        const response = await fetch('/api/v1/events/'+id)
        const {name,location,date,time}  = await response.json()
        modalElements.name.textContent = name
        modalElements.location.textContent = location
        modalElements.date.textContent = date
        modalElements.time.textContent = time
    
        modal.style.display = 'flex'
    }



