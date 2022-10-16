console.log('main script start')
fetch('http://localhost:3000/items').then(r=>r.json()).then(data => 
{
  let i=0
  data.forEach(img => {
    ++i
    let div = document.createElement('div')
    div.innerHTML = `
      <script>performance.mark('HE-start-body-page-image${i}')</script>
      <a href="https://battle.canarytrace.com/" target="_blank" class="group" data-test-id="ob1">
        <div class="aspect-w-1 aspect-h-1 w-full overflow-hidden rounded-lg xl:aspect-w-7 xl:aspect-h-8">
          <img src="${window.location.origin}${img.path}" alt="První cucavá tableta na světě, která slouží jako nutriční doplněk pro hráče." class="h-full w-full object-cover object-center group-hover:opacity-75">
        </div>
        <h3 class="mt-4 text-sm">${img.name}</h3>
        <p class="mt-1 text-lg font-medium">${img.price}</p>
      </a>
      <script>
        performance.mark('HE-stop-body-page-image${i}')
        performance.measure('body-page-image${i}','HE-start-body-page-image${i}','HE-stop-body-page-image${i}')
      </script>
    `
    document.getElementById("gallery").appendChild(div)
  })
})