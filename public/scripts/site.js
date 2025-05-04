

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
                    h2.innerHTML = `<a href ="#" onclick="event.preventDefault();showEventDetails('${_id}'); return false;">${name}</a>`

                const span = document.createElement('span')
                    span.textContent = location
                
                const span2 = document.createElement('span')
                    span2.textContent = date

                const span3 = document.createElement('span')
                    span3.textContent = time
                    
                    div.appendChild(h2)
                    div.appendChild(span)
                    div.appendChild(span2)
                    div.appendChild(span3)

                events.appendChild(div)
            }); 
        }
        getEvents()
            
       

        const closeButton = document.querySelector(".close-button")
       
        closeButton.onclick = () => {
            const modal = document.getElementById("eventModal")
            modal.style.display = 'none'
        }

        window.onclick = event => {
            const modal = document.getElementById("eventModal")
            if (event.target === modal) modal.style.display = 'none'
        }
    



    })()

    
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
    console.log(name)
        modalElements.name.textContent = name
        modalElements.location.textContent = location
        modalElements.date.textContent = date
        modalElements.time.textContent = time
    
        modal.style.display = 'flex'
    }



