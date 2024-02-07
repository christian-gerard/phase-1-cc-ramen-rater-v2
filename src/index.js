// index.js
    const url = "http://localhost:3000/ramens"
    const ramenName = document.querySelector('#ramen-name')
    const ramenImage = document.querySelector('#ramen-image')
    const ramenRestaurant = document.querySelector('#ramen-restaurant')
    const ramenRating = document.querySelector('#rating-display')
    const ramenComment = document.querySelector('#comment-display')
    const ramenMenu = document.querySelector('#ramen-menu')
    const ramenForm = document.querySelector('#new-ramen')
    const ramenUpdateForm = document.querySelector('#update-ramen')
    const deleteRamen = document.querySelector('#delete-ramen')
    let ramenSelector = 1;
    
    // Callbacks



    const handleClick = (ramen) => {
      // Add code
      ramenName.innerText = ramen.name
      ramenImage.src = ramen.image
      ramenRestaurant.innerText = ramen.restaurant
      ramenRating.innerText = ramen.rating
      ramenComment.innerText = ramen.comment
      ramenSelector = ramen.id

    };

    const displayRamenMenu = (ramen) => {
      const menuTile = document.createElement('img')
      menuTile.src = ramen.image
      menuTile.classList.add('ramen-card')
      menuTile.addEventListener('click', () => handleClick(ramen))
      ramenMenu.appendChild(menuTile)

    }
    
    const addUpdateListener = () => {
      ramenUpdateForm.addEventListener('submit', (e) => {
        e.preventDefault();


        fetch(`${url}/${ramenSelector}`, {
          method: 'PATCH',
          headers: 
          {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify({rating: e.target.rating.value, comment: e.target['new-comment'].value})
        })
        .catch(err => console.log(err))
        

          // fetch(`${url}`, {
          //   method: 'PATCH',
          //   headers: 
          //   {
          //     'Content-type': 'application/json'
          //   },
          //   body: JSON.stringify()
          // })
          // .catch(err => {
          //   console.log(err)
          //   displayRamenMenu(newUpdate)
          
          // })


      })
    }
    
    const addSubmitListener = () => {
      // Add code
      ramenForm.addEventListener('submit', (e) => {
        e.preventDefault();

        const ramenNum = document.querySelectorAll('img.ramen-card').length

        const newRamen = {
          id:  `${ramenNum + 1}`,
          name: e.target.name.value,
          restaurant: e.target.restaurant.value,
          image: e.target.image.value,
          rating: parseInt(e.target.rating.value),
          comment: e.target['new-comment'].value
        }

        
        

        if(Object.values(newRamen).includes('')) {
          alert('Please fill out all fields. Thanks!')
        } else {
          
          fetch(url, {
            method: 'POST',
            headers: 
            {
              'Content-type': 'application/json'
            },
            body: JSON.stringify(newRamen)
          })
          .catch(err => {
            console.log(err)
            displayRamenMenu(newRamen)
          
          })

          handleClick(newRamen)
        }
      })
    }

    const addDeleteListener = () => {
      deleteRamen.addEventListener('click', (e) => {
        fetch(`${url}/${ramenSelector}`, {
          method: 'DELETE',
          headers: {
            'Content-Type': 'application/json',
          }
        })
        .catch(err => console.log(err))
      })
    }
    
    const displayRamens = () => {
      // Add code
      return fetch(url)
      .then(resp => resp.json())
      .then((ramen) => {
    

   
          ramenName.innerText = ramen[0].name
          ramenImage.src = ramen[0].image
          ramenRestaurant.innerText = ramen[0].restaurant
          ramenRating.innerText = ramen[0].rating
          ramenComment.innerText = ramen[0].comment

      
        ramen.map((ramen) =>{
    


          displayRamenMenu(ramen)
       
        })
      })
      .catch(error => renderError(error))
      
    };
    
    const main = () => {
      // Invoke displayRamens here
      displayRamens()
      // Invoke addSubmitListener here
      addSubmitListener()
      addUpdateListener()
      addDeleteListener()

    }
  
    main()
    









// Export functions for testing

export {
  displayRamens,
  addSubmitListener,
  handleClick,
  main,
};

