    opened = false;
    window.onload = function() {
    var btn = document.getElementsByTagName('button')[0];
    btn.addEventListener('click', onBtnClick)
    }

    function onBtnClick(e) {
    this.classList.toggle('opened');
    }

    var btnMe = document.getElementById("btn-me");
    btnMe.addEventListener("click", function() {
        window.open("https://www.instagram.com/novio.de.naomita/");
    });

    document.getElementById('btn-close').addEventListener('click', function() {
        window.close();
    });
    
    function openPopupWindow() {
        // Clonar el elemento 'body'
        const bodyClone = document.querySelector('body').cloneNode(true);

        // Eliminar el botón 'Limpiar' del clon
        bodyClone.querySelector('.btn-clear').remove();

        // Eliminar el botón 'Open' del clon
        bodyClone.querySelector('#btn-max').remove();

        // Obtener el contenido HTML del clon
        const bodyContent = bodyClone.innerHTML;

        // Crear una nueva ventana emergente
        const popupWindow = window.open("", "popupWindow", "width=600,height=400,scrollbars=yes");

        // Establecer el contenido HTML de la ventana emergente
        popupWindow.document.write(`
            <style>
                /* Aplicar un zoom del 150% al elemento 'body' */
                body {
                    zoom: 210%;
                }
            </style>
            <link rel="stylesheet" href="injector-solution.css">
            ${bodyContent}
        `);
    }

    // Agregar un detector de eventos al elemento 'div' con la clase 'outer'
    document.getElementById('btn-max').addEventListener('click', function(event) {
        // Detener la propagación del evento
        event.stopPropagation();

        // Abrir la ventana emergente
        openPopupWindow();
    });

    // Agregar un detector de eventos al botón con la clase 'button-30'
    document.querySelector('.btn-clear').addEventListener('click', function() {
        // Borrar toda la información almacenada en el almacenamiento local
        localStorage.clear();

        // Obtener todos los elementos 'li'
        const listItems = document.querySelectorAll("li");

        // Recorrer todos los elementos 'li'
        for (let i = 0; i < listItems.length; i++) {
            // Establecer el contenido del elemento 'li' en una cadena vacía
            listItems[i].textContent = "";

            // Agregar el atributo 'hidden' al elemento 'li'
            listItems[i].setAttribute("hidden", "");
        }
    });

    const script = `var result = '';
        var iframes = document.getElementsByTagName('iframe');
        for (var i = 0; i < iframes.length; i++) {
            var iframe = iframes[i];
            var iframeDocument = iframe.contentDocument || iframe.contentWindow.document;

            // Obtén el elemento li con la clase 'step current' dentro del header
            var liElement = iframeDocument.querySelector('header li.step.current');

            // Verifica si el elemento li existe
            if (liElement) {
                // Obtén el elemento span dentro del elemento li
                var spanElement = liElement.querySelector('span');

                // Verifica si el elemento span existe
                if (spanElement) {
                    // Obtén el texto del elemento span
                    result = spanElement.textContent;
                }
            }

            var correctAnswers = iframeDocument.querySelectorAll('p[tabindex="0"]');
            for (var j = 0; j < correctAnswers.length; j++) {
                if (correctAnswers[j].textContent.includes('Correct answer:') || correctAnswers[j].textContent.includes('Correct answers:')) {
                    var correctAnswerContent = correctAnswers[j].innerHTML;
                    correctAnswerContent = correctAnswerContent.replace(/<br>/g,'\\n');
                    correctAnswerContent = correctAnswerContent.replace(/<[^>]*>/g, '');
                    correctAnswerContent = correctAnswerContent.replace(/&nbsp;/g, ' ');
                    result += '\\n' + correctAnswerContent;

                    // Verificar si hay elementos 'img' dentro del elemento con tabindex="0"
                    var imgElements = correctAnswers[j].querySelectorAll('img');
                    console.log(imgElements);
                    // Si se encuentran elementos 'img', itera sobre ellos y obtén su atributo 'currentSrc'
                    if (imgElements.length > 0) {
                        imgElements.forEach(function(imgElement) {
                            var currentSrc = imgElement.currentSrc;
                            console.log(currentSrc);

                            // Agregar el enlace a result
                            result += '\\n' + currentSrc;
                        });
                    }
                }
            }
        }
        result;
    `;

    const script_summary = `var result_summary = '';
    var div_title = document.querySelector('div.nav-container');
                
        // Verifica si el div-title existe
        if (div_title) {
            // Obtén el elemento a dentro del div-title
            var a = div_title.querySelector('a.open-sidebar');
            
            // Verifica si el elemento a existe
            if (a) {
                // Obtén el valor del atributo title del elemento a
                var title = a.getAttribute('title');
                result_summary = title;
            }
        }
        result_summary;
    `;

    const script_answers = `// Script para buscar en los iframe y devolver el resultado
        var result_correct_answers = '';
        var iframes = document.getElementsByTagName('iframe');
        for (var i = 0; i < iframes.length; i++) {
            var iframe = iframes[i];
            var iframeDocument = iframe.contentDocument || iframe.contentWindow.document;
        
            // Obtén el elemento li con la clase 'step current' dentro del header
            var liElement = iframeDocument.querySelector('header li.step.current');
        
            // Verifica si el elemento li existe
            if (liElement) {
                // Obtén el elemento span dentro del elemento li
                var spanElement = liElement.querySelector('span');
        
                // Verifica si el elemento span existe
                if (spanElement) {
                    // Obtén el texto del elemento span
                    result_correct_answers = spanElement.textContent;
                }
            }
        
            // Obtén todos los elementos 'p' con el atributo 'tabindex' igual a '0'
            var correctAnswers = iframeDocument.querySelectorAll('p[tabindex="0"]');
            for (var j = 0; j < correctAnswers.length; j++) {
                // Verifica si el texto del elemento 'p' incluye 'Correct!'
                if (correctAnswers[j].textContent.includes('Correct!')) {
                    // Obtén el contenido HTML del elemento 'p'
                    var correctAnswerContent = correctAnswers[j].innerHTML;
                    // Reemplaza las etiquetas '<br>' con saltos de línea
                    correctAnswerContent = correctAnswerContent.replace(/<br>/g,'\\n');
                    // Elimina todas las etiquetas HTML
                    correctAnswerContent = correctAnswerContent.replace(/<[^>]*>/g, '');
                    // Reemplaza los espacios en blanco no separables con espacios normales
                    correctAnswerContent = correctAnswerContent.replace(/&nbsp;/g, ' ');
                    // Agrega el contenido del elemento 'p' al resultado
                    result_correct_answers += '\\n' + correctAnswerContent;
                    
                    // Ejecuta el código adicional si se encuentra una respuesta correcta
                    var iframe = document.querySelector('iframe'); // Reemplaza este selector con el selector del iframe que deseas
                    if (iframe) {
                        var contentWrap = iframe.contentWindow.document.querySelector('.content-wrap.at-revealObject:not(.activity--hidden)');
                        if (contentWrap) {
                            // Obtén todos los elementos 'button' dentro de contentWrap.innerHTML
                            var buttonElements = contentWrap.querySelectorAll('button[id]');
                            
                            // Verifica si hay elementos 'button'
                            if (buttonElements.length > 0) {
                                // Hay elementos 'button', itera sobre ellos y obtén el texto de cada uno
                                buttonElements.forEach(function(buttonElement) {
                                    var buttonText = buttonElement.textContent.trim(); // Elimina espacios en blanco al principio y al final
                                    if (buttonText !== "") {
                                        console.log(buttonText);
                                        result_correct_answers += '\\n' + buttonText;
                                    }
                                });
                            } else {
                                // No hay elementos 'button', busca elementos 'input' de tipo "text" en su lugar
                                var inputElements = contentWrap.querySelectorAll('input[type="text"]');
                                
                                if (inputElements.length > 0) {
                                    // Hay elementos 'input', itera sobre ellos y obtén su valor
                                    inputElements.forEach(function(inputElement) {
                                        console.log(inputElement.value);
                                        result_correct_answers += '\\n' + inputElement.value;
                                    });
                                } else {
                                    // No hay elementos 'input', busca elementos 'span' con la clase 'is-radiobutton-choice-text' en su lugar
                                    var spanElements = contentWrap.querySelectorAll('div.input-radio-checked span.is-radiobutton-choice-text');
                                    if (spanElements.length > 0) {
                                        // Hay elementos 'span', itera sobre ellos y obtén su texto
                                        spanElements.forEach(function(spanElement) {
                                            // Busca elementos 'img' dentro del elemento 'span'
                                            var imgElements = spanElement.querySelectorAll('img');
                                            console.log(imgElements);
                                            // Si se encuentran elementos 'img', itera sobre ellos y obtén su atributo 'id'
                                            if (imgElements.length > 0) {
                                                imgElements.forEach(function(imgElement) {
                                                    var currentSrc = imgElement.currentSrc;
                                                    console.log(currentSrc);
                                            
                                                    // Agregar el enlace a result_correct_answers
                                                    result_correct_answers += '\\n' + currentSrc;
                                                    
                                                });
                                            } else {
                                                // Si no se encuentran elementos 'img', obtén el texto del elemento 'span'
                                                console.log(spanElement.textContent);
                                                result_correct_answers += '\\n' + spanElement.textContent;
                                            }
                                        });
                                    } else {
                                        // Selecciona todos los elementos 'li' con las clases 'drop_area' y 'gap_match_gap_text_view'
                                        var liElements = contentWrap.querySelectorAll('li.drop_area.gap_match_gap_text_view');
                                        
                                        // Itera sobre los elementos 'li' y elimina su contenido
                                        liElements.forEach(function(liElement) {
                                            liElement.innerHTML = '';
                                        });
                                        
                                        // Crea un objeto para almacenar los textos únicos
                                        var uniqueTexts = {};
                                        
                                        // Selecciona todos los elementos 'div' que tengan las clases 'input-checkbox-checked' y 'checked-correct', pero no tengan la clase 'checked-empty'
                                        var divElements = contentWrap.querySelectorAll('div.input-checkbox-checked.checked-correct:not(.checked-empty)');
                                        
                                        // Si no se encuentran elementos 'div', busca elementos 'span' con la clase 'firstword'
                                        if (divElements.length === 0) {
                                            var firstWordElements = contentWrap.querySelectorAll('span.firstword');
                                            
                                            // Si no se encuentran elementos 'span.firstword', busca elementos 'div' con las clases 'draggable__content' y 'content'
                                            if (firstWordElements.length === 0) {
                                                // Selecciona todos los elementos 'div' que tengan la clase 'checked-correct'
                                                var contentDivs = contentWrap.querySelectorAll('div.checked-correct');
                                                
                                                // Itera sobre los elementos 'div' y obtén su texto
                                                contentDivs.forEach(function(contentDiv) {
                                                    var text = contentDiv.textContent;
                                                    
                                                    // Si el texto no está en el objeto de textos únicos, agrégalo y muestra el resultado
                                                    if (!uniqueTexts[text]) {
                                                        uniqueTexts[text] = true;
                                                        result_correct_answers += '\\n' + text;
                                                    }
                                                });
                                                var lines = result_correct_answers.split('\\n');
                                                var filteredLines = lines.filter(function(line) {
                                                    return line.trim() !== '[+]' && line.trim() !== '';
                                                });
                                                var resultText = filteredLines.join('\\n');
                                                result_correct_answers = resultText;
                                            }
                                            else {
                                                // Itera sobre los elementos 'span' y obtén su texto
                                                firstWordElements.forEach(function(firstWordElement) {
                                                    var text = firstWordElement.textContent;
                                                    
                                                    // Si el texto no está en el objeto de textos únicos, agrégalo y muestra el resultado
                                                    if (!uniqueTexts[text]) {
                                                        uniqueTexts[text] = true;
                                                        console.log(text);
                                                        result_correct_answers += '\\n' + text;
                                                    }
                                                });
                                            }
                                        } else {
                                            // Itera sobre los elementos 'div' y busca elementos 'span' dentro de ellos
                                            divElements.forEach(function(divElement) {
                                                var spanElements = divElement.querySelectorAll('span');
                                                
                                                // Itera sobre los elementos 'span' y obtén su texto
                                                spanElements.forEach(function(spanElement) {
                                                    var text = spanElement.textContent;
                                                    
                                                    // Si el texto no está en el objeto de textos únicos, agrégalo y muestra el resultado
                                                    if (!uniqueTexts[text]) {
                                                        uniqueTexts[text] = true;
                                                        console.log(text);
                                                        result_correct_answers += '\\n' + text;
                                                    }
                                                });
                                            });
                                        }
                                    }
                                }
                            }
                        }
                    }
                }
            }
        }
        result_correct_answers;
    `;

    // Función para guardar el resultado en el almacenamiento local
    function saveResult(result) {
        // Convertir el resultado a una cadena JSON
        const resultString = JSON.stringify(result);

        // Guardar el resultado en el almacenamiento local
        localStorage.setItem("result", resultString);
    }

    // Función para recuperar el resultado del almacenamiento local
    function getResult() {
        // Obtener el resultado del almacenamiento local
        const resultString = localStorage.getItem("result");

        // Convertir la cadena JSON a un objeto JavaScript
        const result = JSON.parse(resultString);

        return result;
    }

    // Función para ejecutar el script en la pestaña activa de la ventana actual y verificar el resultado
    function executeScript() {
        chrome.tabs.query({active: true, currentWindow: true}, function(tabs) {
            chrome.tabs.executeScript(tabs[0].id, { code: script }, function(result) {
                // Verificar si el script devolvió algo
                if (result[0] && !/^\d+$/.test(result[0])) {
                    // Obtener el nuevo resultado devuelto por el script
                    const newResult = result[0];
                    // Recuperar los resultados anteriores del almacenamiento local
                    const previousResultsSet = new Set(getResult() || []);

                    // Obtener el índice del nuevo resultado
                    const newIndex = newResult.split('\n')[0].trim();

                    // Eliminar cualquier resultado anterior con el mismo índice
                    for (const previousResult of previousResultsSet) {
                        const previousIndex = previousResult.split('\n')[0].trim();
                        if (previousIndex === newIndex) {
                            previousResultsSet.delete(previousResult);
                        }
                    }

                    // Agregar el nuevo resultado al conjunto
                    previousResultsSet.add(newResult);

                    // Convertir el conjunto de resultados a una matriz
                    let previousResultsArray = Array.from(previousResultsSet);
                    
                    // Ordenar la matriz de resultados por índice
                    previousResultsArray.sort((a, b) => {
                        const indexA = parseInt(a.split('\n')[0].trim());
                        const indexB = parseInt(b.split('\n')[0].trim());
                        return indexA - indexB;
                    });

                    // Guardar los resultados actualizados en el almacenamiento local
                    saveResult(previousResultsArray);

                    // Actualizar la lista de elementos 'li' con los resultados actualizados
                    const listItems = document.querySelectorAll("li");
                    for (let i = 0; i < listItems.length; i++) {
                        if (i < previousResultsArray.length) {
                            // Utiliza el texto recuperado como índice en la respuesta
                            // Generar un color aleatorio en formato RGB
                            const randomColor = () => {
                                const r = Math.floor(Math.random() * 128) + 128;
                                const g = Math.floor(Math.random() * 128) + 128;
                                const b = Math.floor(Math.random() * 128) + 128;
                                return `rgb(${r}, ${g}, ${b})`;
                            };

                            // Establecer el contenido y el estilo del elemento 'li'
                            listItems[i].innerHTML = "(" + previousResultsArray[i].split('\n')[0] + ") " + previousResultsArray[i].split('\n')[1] + '<br>' + previousResultsArray[i].split('\n').slice(2).map(answer => {
                                // Verificar si la respuesta es una URL
                                if (answer.startsWith("http") || answer.startsWith("https")) {
                                    return `<img src="${answer}" style="max-width: 50%; margin-left: 22px; margin-top: 10px; margin-bottom: 3px; border-radius: 20px;">`;
                                } else {
                                    return `<span style="color: ${randomColor()}; margin-left: 22px;">[+] ${answer.replace(/\d+ /, '')}</span>`;
                                }
                            }).join('<br>');
                            listItems[i].removeAttribute("hidden");
                        } else {
                            listItems[i].textContent = "";
                        }
                    }
                    clearInterval(interval);
                }
            });
        });
    }

   // Función para ejecutar el script en la pestaña activa de la ventana actual y verificar el resultado
    function executeScriptAnswers() {
        chrome.tabs.query({active: true, currentWindow: true}, function(tabs) {
            chrome.tabs.executeScript(tabs[0].id, { code: script_answers }, function(result) {
                // Verificar si el script devolvió algo
                if (result[0] && !/^\d+$/.test(result[0])) {
                    // Obtener el nuevo resultado devuelto por el script
                    const newResult = result[0];
                    // Recuperar los resultados anteriores del almacenamiento local
                    const previousResultsSet = new Set(getResult() || []);

                    // Obtener el índice del nuevo resultado
                    const newIndex = newResult.split('\n')[0].trim();

                    // Eliminar cualquier resultado anterior con el mismo índice
                    for (const previousResult of previousResultsSet) {
                        const previousIndex = previousResult.split('\n')[0].trim();
                        if (previousIndex === newIndex) {
                            previousResultsSet.delete(previousResult);
                        }
                    }

                    // Agregar el nuevo resultado al conjunto
                    previousResultsSet.add(newResult);

                    // Convertir el conjunto de resultados a una matriz
                    let previousResultsArray = Array.from(previousResultsSet);
                    
                    // Ordenar la matriz de resultados por índice
                    previousResultsArray.sort((a, b) => {
                        const indexA = parseInt(a.split('\n')[0].trim());
                        const indexB = parseInt(b.split('\n')[0].trim());
                        return indexA - indexB;
                    });

                    // Guardar los resultados actualizados en el almacenamiento local
                    saveResult(previousResultsArray);

                    // Actualizar la lista de elementos 'li' con los resultados actualizados
                    const listItems = document.querySelectorAll("li");
                    for (let i = 0; i < listItems.length; i++) {
                        if (i < previousResultsArray.length) {
                            // Utiliza el texto recuperado como índice en la respuesta
                            // Generar un color aleatorio en formato RGB
                            const randomColor = () => {
                                const r = Math.floor(Math.random() * 128) + 128;
                                const g = Math.floor(Math.random() * 128) + 128;
                                const b = Math.floor(Math.random() * 128) + 128;
                                return `rgb(${r}, ${g}, ${b})`;
                            };

                            // Establecer el contenido y el estilo del elemento 'li'
                            listItems[i].innerHTML = "(" + previousResultsArray[i].split('\n')[0] + ") " + previousResultsArray[i].split('\n')[1] + '<br>' + previousResultsArray[i].split('\n').slice(2).map(answer => {
                                // Verificar si la respuesta es una URL
                                if (answer.startsWith("http") || answer.startsWith("https")) {
                                    return `<img src="${answer}" style="max-width: 50%; margin-left: 22px; margin-top: 10px; margin-bottom: 3px; border-radius: 20px;">`;
                                } else {
                                    return `<span style="color: ${randomColor()}; margin-left: 22px;">[+] ${answer.replace(/\d+ /, '')}</span>`;
                                }
                            }).join('<br>');
                            listItems[i].removeAttribute("hidden");
                        } else {
                            listItems[i].textContent = "";
                        }
                    }
                    clearInterval(interval_2);
                }
            });
        });
    }

    function updateSummary() {
        chrome.tabs.query({active: true, currentWindow: true}, function(tabs) {
            chrome.tabs.executeScript(tabs[0].id, { code: script_summary }, function(result_summary) {
                // Verificar si el script devolvió algo
                if (result_summary[0]) {
                    // Obtener el nuevo resultado devuelto por el script
                    const newResult = result_summary[0];
                    
                    // Dividir el resultado en líneas
                    const lines = newResult.split('\\n');
                    
                    // Obtener la última línea del resultado, que debería contener el título
                    const title = lines[lines.length - 1];
                    
                    // Actualizar el texto del elemento summary con el nuevo título
                    const summary = document.querySelector('#summary-btn');
                    summary.textContent = title;
                }
            });
        });
    }
    
    // Ejecutar la función executeScript cada segundo
    const interval = setInterval(executeScript, 50);

    // Ejecutar la función executeScript cada segundo
    const interval_2 = setInterval(executeScriptAnswers, 50);
    
    // Establece un intervalo para ejecutar la función updateSummary cada 1 segundo
    setInterval(updateSummary, 50);

    // Agregar un detector de eventos al elemento 'summary' con el ID 'summary-btn'
    document.querySelector('#summary-btn').addEventListener('click', function() {
        // Recuperar los resultados anteriores del almacenamiento local
        const previousResultsSet = new Set(getResult() || []);
        // Obtener el contenido HTML guardado desde el almacenamiento local
        const previousResultsArray = Array.from(previousResultsSet);

        if (previousResultsArray)
        {
            // Actualizar la lista de elementos 'li' con los resultados actualizados
            const listItems = document.querySelectorAll("li");
            for (let i = 0; i < listItems.length; i++) {
                if (i < previousResultsArray.length) {
                    // Generar un color aleatorio en formato RGB
                    const randomColor = () => {
                        const r = Math.floor(Math.random() * 128) + 128;
                        const g = Math.floor(Math.random() * 128) + 128;
                        const b = Math.floor(Math.random() * 128) + 128;
                        return `rgb(${r}, ${g}, ${b})`;
                    };

                    // Establecer el contenido y el estilo del elemento 'li'
                    listItems[i].innerHTML = "(" + previousResultsArray[i].split('\n')[0] + ") " + previousResultsArray[i].split('\n')[1] + '<br>' + previousResultsArray[i].split('\n').slice(2).map(answer => {
                        // Verificar si la respuesta es una URL
                        if (answer.startsWith("http") || answer.startsWith("https")) {
                            return `<img src="${answer}" style="max-width: 50%; margin-left: 22px; margin-top: 10px; margin-bottom: 3px; border-radius: 20px;">`;
                        } else {
                            return `<span style="color: ${randomColor()}; margin-left: 22px;">[+] ${answer.replace(/\d+ /, '')}</span>`;
                        }
                    }).join('<br>');
                    listItems[i].removeAttribute("hidden");
                } else {
                    listItems[i].textContent = "";
                }
            }
        }
    });

    function checkListItems() {
        // Obtener todos los elementos 'li'
        const listItems = document.querySelectorAll("li");
        
        // Iterar sobre cada elemento 'li'
        for (let i = 0; i < listItems.length; i++) {
            // Obtener el elemento 'img' dentro del elemento 'li'
            const imgElement = listItems[i].querySelector("img");
            
            // Verificar si el elemento 'img' existe
            if (imgElement) {
                // Obtener todos los elementos 'span' y 'br' dentro del elemento 'li'
                const spanElements = listItems[i].querySelectorAll("span");
                const brElements = listItems[i].querySelectorAll("br");
    
                // Eliminar todos los elementos 'span'
                spanElements.forEach(function(spanElement) {
                    spanElement.remove();
                });
    
                // Eliminar todos los elementos 'br' excepto uno
                for (let j = 1; j < brElements.length; j++) {
                    brElements[j].remove();
                }
            }
        }
    }    
    
    setInterval(checkListItems, 50);
