

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
            
            json.forEach(({name, location, date, time}) => {
                const div = document.createElement('div')
                const h2 = document.createElement('h2')
                    h2.textContent = name

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
            
    
    

    })()
    
    
    



