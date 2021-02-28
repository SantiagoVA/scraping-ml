const select = document.getElementById('selectInfo');
select.addEventListener('change',
  function(){
    const selectedOption = this.options[select.selectedIndex];
    function showData(){
        const xhttp = new XMLHttpRequest();
        xhttp.open('GET', `./dataFiles/${selectedOption.text}.json`, true);
        xhttp.send();
        xhttp.onreadystatechange = function(){
            if(this.readyState == 4 && this.status == 200){
                
                let data = JSON.parse(this.responseText);
                let container = document.querySelector('#container-list');
    
                container.innerHTML = '';
                // console.log(data)
    
                for(let item of data){
                    // console.log(item)
                    container.innerHTML += 
                    `
                    <li class="cards">
                    <a class="products" href="${item.link}" target=_blank><h3 class="names">${item.title}</h3></a> 
                    </li>
                    `
                }
            }
        }
    
}
showData();
  });
