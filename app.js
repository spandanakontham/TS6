(function() {
    // Dummy data for saved products
    let savedProducts = [
        { name: "Product A", brand: "Brand X", brandVersion: "V1", product: "X1", productVersion: "V2" },
        { name: "Product B", brand: "Brand Y", brandVersion: "V2", product: "Y2", productVersion: "V1" },
        { name: "Product C", brand: "Brand Z", brandVersion: "V3", product: "Z3", productVersion: "V3" }
    ];

    const brands = ["Brand X", "Brand Y", "Brand Z", "Gillette", "Pampers", "Dove", "Comfort"];
    const products = ["X1", "X2", "Y1", "Y2", "Z1", "Z2", "Gillette X", "Gillette Y", "Pampers X", "Pampers Y", "Dove X", "Dove Y", "Comfort X", "Comfort Y"];
    const versions = ["V1", "V2", "V3"];
    const corporateEntities = ["P&G", "Unilever"];
    const regions = ["USA", "Europe", "Asia", "Africa", "South America"];

    function showAllSavedProducts() {
        console.log("showAllSavedProducts function called");
        const productList = document.getElementById('product-properties');
        const productForm = document.getElementById('product-form');
        const boxContent = productList.querySelector('.box-content');
        const anglesBox = document.getElementById('angles-box');
        const scriptsBox = document.getElementById('scripts-box');
        const variantsBox = document.getElementById('variants-box');

        let newContent = `
            <h3>All Saved Products</h3>
            <table class="saved-products-table">
                <thead>
                    <tr>
                        <th>Product Detail Name</th>
                        <th>Brand</th>
                        <th>Brand Version</th>
                        <th>Product</th>
                        <th>Product Version</th>
                    </tr>
                </thead>
                <tbody>
                    ${savedProducts.map((product, index) => `
                        <tr data-index="${index}">
                            <td>${product.name}</td>
                            <td>${product.brand}</td>
                            <td>${product.brandVersion}</td>
                            <td>${product.product}</td>
                            <td>${product.productVersion}</td>
                        </tr>
                    `).join('')}
                </tbody>
            </table>
            <button id="add-new-product-detail" class="small-btn">Add New Product Detail</button>
        `;

        boxContent.innerHTML = newContent;
        productList.style.display = 'block';
        productForm.style.display = 'none';
        anglesBox.style.display = 'block';
        scriptsBox.style.display = 'block';
        variantsBox.style.display = 'block';

        document.getElementById('add-new-product-detail').addEventListener('click', showProductForm);
        document.querySelectorAll('.saved-products-table tbody tr').forEach(row => {
            row.addEventListener('click', () => {
                const index = row.dataset.index;
                showProductForm(() => populateProductDetails(savedProducts[index]));
            });
        });
    }

    function showProductForm(callback = null) {
        const productList = document.getElementById('product-properties');
        const productForm = document.getElementById('product-form');
        const anglesBox = document.getElementById('angles-box');
        const scriptsBox = document.getElementById('scripts-box');
        const variantsBox = document.getElementById('variants-box');
        
        productList.style.display = 'none';
        productForm.style.display = 'block';
        anglesBox.style.display = 'block';
        scriptsBox.style.display = 'block';
        variantsBox.style.display = 'block';
        
        setupEventListeners();
        addPropertyInputs();
        setupAutocomplete();
        
        if (callback) {
            setTimeout(callback, 0);
        }
    }

    function setupEventListeners() {
        console.log("Setting up event listeners");

        const cancelBtn = document.getElementById('cancel-btn');
        if (cancelBtn) {
            cancelBtn.addEventListener('click', (e) => {
                e.preventDefault();
                clearAllInputs();
                showAllSavedProducts();
            });
        }

        const saveBtn = document.getElementById('save-btn');
        if (saveBtn) {
            saveBtn.addEventListener('click', (e) => {
                e.preventDefault();
                saveProductDetails();
            });
        }

        const addStrategyBtn = document.getElementById('add-strategy-btn');
        if (addStrategyBtn) {
            addStrategyBtn.addEventListener('click', addStrategy);
        }

        const addMoreStrategiesLink = document.getElementById('add-more-strategies');
        if (addMoreStrategiesLink) {
            addMoreStrategiesLink.addEventListener('click', (e) => {
                e.preventDefault();
                addStrategy();
            });
        }

        const aiGenerateStrategiesBtn = document.getElementById('ai-generate-strategies');
        if (aiGenerateStrategiesBtn) {
            aiGenerateStrategiesBtn.addEventListener('click', () => aiGenerate('strategies'));
        }

        const addMoreAnglesLink = document.getElementById('add-more-angles');
        if (addMoreAnglesLink) {
            addMoreAnglesLink.addEventListener('click', (e) => {
                e.preventDefault();
                addAngle();
            });
        }

        const aiGenerateAnglesBtn = document.getElementById('ai-generate-angles');
        if (aiGenerateAnglesBtn) {
            aiGenerateAnglesBtn.addEventListener('click', () => aiGenerate('angles'));
        }

        const addMoreScriptsLink = document.getElementById('add-more-scripts');
        if (addMoreScriptsLink) {
            addMoreScriptsLink.addEventListener('click', (e) => {
                e.preventDefault();
                addScript();
            });
        }

        const aiGenerateScriptsBtn = document.getElementById('ai-generate-scripts');
        if (aiGenerateScriptsBtn) {
            aiGenerateScriptsBtn.addEventListener('click', () => aiGenerate('scripts'));
        }

        const addMoreVariantsLink = document.getElementById('add-more-variants');
        if (addMoreVariantsLink) {
            addMoreVariantsLink.addEventListener('click', (e) => {
                e.preventDefault();
                addVariant();
            });
        }

        const aiGenerateVariantsBtn = document.getElementById('ai-generate-variants');
        if (aiGenerateVariantsBtn) {
            aiGenerateVariantsBtn.addEventListener('click', () => aiGenerate('variants'));
        }

        const dropdownContent = document.querySelector('.dropdown-content');
        if (dropdownContent) {
            dropdownContent.addEventListener('click', function(e) {
                e.preventDefault();
                if (e.target.tagName === 'A') {
                    const type = e.target.dataset.type;
                    switch(type) {
                        case 'strategy':
                            addStrategy();
                            break;
                        case 'angle':
                            addAngle();
                            break;
                        case 'script':
                            addScript();
                            break;
                        case 'variant':
                            addVariant();
                            break;
                    }
                }
            });
        }
    }

    function clearAllInputs() {
        document.getElementById('brand').value = '';
        document.getElementById('brand-version').value = '';
        document.getElementById('product').value = '';
        document.getElementById('product-version').value = '';
        document.getElementById('product-detail-name').value = '';
        
        const propertyInputs = document.querySelectorAll('#property-inputs input');
        propertyInputs.forEach(input => input.value = '');
    }

    function saveProductDetails() {
        const productDetailName = document.getElementById('product-detail-name').value;
        if (savedProducts.some(product => product.name === productDetailName)) {
            alert('A product with this Product Detail Name already exists. Please choose a unique name.');
            return;
        }

        const productData = {
            name: productDetailName,
            brand: document.getElementById('brand').value,
            brandVersion: document.getElementById('brand-version').value,
            product: document.getElementById('product').value,
            productVersion: document.getElementById('product-version').value
        };

        const propertyInputs = document.querySelectorAll('#property-inputs .property-input');
        propertyInputs.forEach(propertyInput => {
            const propertyName = propertyInput.querySelector('h4').textContent;
            const propertyValues = Array.from(propertyInput.querySelectorAll('input')).map(input => input.value).filter(Boolean);
            productData[propertyName.toLowerCase().replace(/\s+/g, '-')] = propertyValues.join(', ');
        });

        savedProducts.push(productData);
        alert('Product details saved successfully!');
        clearAllInputs();
        showAllSavedProducts();
    }

    function populateProductDetails(productData) {
        document.getElementById('brand').value = productData.brand || '';
        document.getElementById('brand-version').value = productData.brandVersion || '';
        document.getElementById('product').value = productData.product || '';
        document.getElementById('product-version').value = productData.productVersion || '';
        document.getElementById('product-detail-name').value = productData.name || '';
        
        addPropertyInputs(productData);
    }

    function addPropertyInput(property, container, value = '') {
        const inputDiv = document.createElement('div');
        inputDiv.className = 'property-input';
        inputDiv.innerHTML = `
            <div class="property-header">
                <h4>${property}</h4>
                <a href="#" class="add-more" data-property="${property}">Add more</a>
            </div>
            <div class="input-group">
                <input type="text" name="${property.toLowerCase().replace(/\s+/g, '-')}" placeholder="Enter ${property}" value="${value}">
            </div>
        `;
        container.appendChild(inputDiv);

        const addMoreBtn = inputDiv.querySelector('.add-more');
        addMoreBtn.addEventListener('click', (e) => {
            e.preventDefault();
            const newInput = document.createElement('div');
            newInput.className = 'input-group';
            newInput.innerHTML = `<input type="text" name="${property.toLowerCase().replace(/\s+/g, '-')}" placeholder="Enter ${property}">`;
            inputDiv.appendChild(newInput);
        });
    }

    function addPropertyInputs(productData = null) {
        const propertyInputs = [
            'Top feature customers look for while buying product',
            'Top Feature of company\'s product',
            'Top Benefit of company\'s product',
            'Ad references',
            'Product Media',
            'Additional Information'
        ];
        const propertyInputsContainer = document.getElementById('property-inputs');
        propertyInputsContainer.innerHTML = '';
        propertyInputs.forEach(property => {
            const value = productData ? (productData[property.toLowerCase().replace(/\s+/g, '-')] || '') : '';
            addPropertyInput(property, propertyInputsContainer, value);
        });
    }

    function setupAutocomplete() {
        const brandInput = document.getElementById('brand');
        const productInput = document.getElementById('product');
        const brandVersionSelect = document.getElementById('brand-version');
        const productVersionSelect = document.getElementById('product-version');

        setupAutocompleteForInput(brandInput, brands);
        setupAutocompleteForInput(productInput, products);
        setupOptionsForSelect(brandVersionSelect, versions);
        setupOptionsForSelect(productVersionSelect, versions);
    }

    function setupAutocompleteForInput(input, items) {
        const wrapper = document.createElement('div');
        wrapper.className = 'autocomplete-container';
        input.parentNode.insertBefore(wrapper, input);
        wrapper.appendChild(input);

        const autocompleteList = document.createElement('div');
        autocompleteList.className = 'autocomplete-items';
        wrapper.appendChild(autocompleteList);

        function showSuggestions() {
            const val = input.value.toLowerCase();
            autocompleteList.innerHTML = '';

            const filteredItems = items.filter(item => item.toLowerCase().includes(val));
            
            filteredItems.forEach(item => {
                const div = document.createElement('div');
                div.innerHTML = item.replace(new RegExp(val, 'gi'), match => `<strong>${match}</strong>`);
                div.addEventListener('click', function() {
                    input.value = this.textContent;
                    autocompleteList.style.display = 'none';
                });
                autocompleteList.appendChild(div);
            });

            const addNewDiv = document.createElement('div');
            addNewDiv.textContent = `Add new ${input.id}`;
            addNewDiv.addEventListener('click', function() {
                const newItem = prompt(`Enter new ${input.id}:`);
                if (newItem && !items.includes(newItem)) {
                    items.push(newItem);
                    input.value = newItem;
                }
                autocompleteList.style.display = 'none';
            });
            autocompleteList.appendChild(addNewDiv);

            autocompleteList.style.display = 'block';
        }

        input.addEventListener('focus', showSuggestions);
        input.addEventListener('input', showSuggestions);

        document.addEventListener('click', function(e) {
            if (e.target !== input && e.target !== autocompleteList) {
                autocompleteList.style.display = 'none';
            }
        });
    }

    function setupOptionsForSelect(select, options) {
        select.innerHTML = '<option value="">Select version</option>';
        options.forEach(option => {
            const optionElement = document.createElement('option');
            optionElement.value = option;
            optionElement.textContent = option;
            select.appendChild(optionElement);
        });
        
        const addNewOption = document.createElement('option');
        addNewOption.value = 'add_new';
        addNewOption.textContent = 'Add new version';
        select.appendChild(addNewOption);

        select.addEventListener('change', function() {
            if (this.value === 'add_new') {
                const newVersion = prompt('Enter new version:');
                if (newVersion && !options.includes(newVersion)) {
                    options.push(newVersion);
                    const newOption = document.createElement('option');
                    newOption.value = newVersion;
                    newOption.textContent = newVersion;
                    this.insertBefore(newOption, this.lastElementChild);
                    this.value = newVersion;
                } else {
                    this.value = '';
                }
            }
        });
    }

    function aiGenerate(type) {
        const dropdown = document.createElement('select');
        dropdown.className = 'ai-generate-dropdown';
        dropdown.innerHTML = `
            <option value="">Select number</option>
            ${[1, 2, 3, 4, 5].map(num => `<option value="${num}">${num}</option>`).join('')}
        `;

        const container = document.getElementById(`${type}-box`);
        container.appendChild(dropdown);

        dropdown.addEventListener('change', function() {
            const count = parseInt(this.value);
            if (!isNaN(count)) {
                const content = document.getElementById(`${type}-content`);
                const aiGeneratedContent = document.createElement('div');
                aiGeneratedContent.className = 'ai-generated-content';
                
                for (let i = 0; i < count; i++) {
                    const subbox = document.createElement('div');
                    subbox.className = `${type.slice(0, -1)}-subbox ai-generated`;
                    subbox.innerHTML = `
                        <h3>Coming soon</h3>
                        <div class="subbox-content">
                            <p>Coming soon</p>
                        </div>
                    `;
                    aiGeneratedContent.appendChild(subbox);
                    subbox.querySelector('h3').addEventListener('click', () => toggleSubbox(subbox));
                }
                
                content.appendChild(aiGeneratedContent);
            }
            container.removeChild(dropdown);
        });
    }

    function updateStrategyStats() {
        const strategiesContent = document.getElementById('strategies-content');
        const strategies = strategiesContent.querySelectorAll('.strategy-subbox:not(.ai-generated)');

        strategies.forEach(strategy => {
            const angleCount = strategy.querySelectorAll('.angle-subbox:not(.ai-generated)').length;
            const scriptCount = strategy.querySelectorAll('.script-subbox:not(.ai-generated)').length;
            const variantCount = strategy.querySelectorAll('.variant-subbox:not(.ai-generated)').length;

            const strategyStats = strategy.querySelector('.strategy-stats');
            strategyStats.textContent = `${angleCount} angles, ${scriptCount} scripts, ${variantCount} variants`;
        });
    }

    function addStrategy() {
        const strategiesContent = document.getElementById('strategies-content');
        const strategyCount = strategiesContent.querySelectorAll('.strategy-subbox:not(.ai-generated)').length + 1;

        const strategySubbox = document.createElement('div');
        strategySubbox.className = 'strategy-subbox';
        strategySubbox.innerHTML = `
            <h3>Strategy ${strategyCount}</h3>
            <div class="tree-graph">
                <i class="fas fa-project-diagram"></i>
                <span class="strategy-stats">0 angles, 0 scripts, 0 variants</span>
            </div>
            <div class="subbox-content">
                <label>Nickname</label>
                <input type="text" placeholder="Enter strategy nickname" class="large-input">
                <label>Description</label>
                <input type="text" placeholder="Enter strategy description" class="large-input">
                <div class="strategy-actions">
                    <button class="strategy-action-btn edit-btn" title="Edit"><i class="fas fa-edit"></i></button>
                    <button class="strategy-action-btn save-btn" title="Save"><i class="fas fa-save"></i></button>
                    <button class="strategy-action-btn copy-btn" title="Copy"><i class="fas fa-copy"></i></button>
                    <button class="strategy-action-btn delete-btn" title="Delete"><i class="fas fa-trash-alt"></i></button>
                </div>
                <div class="dropdown strategy-add-dropdown">
                    <button class="dropdown-btn">Add <i class="fas fa-chevron-right"></i></button>
                    <div class="dropdown-content">
                        <a href="#" data-type="angle">Angle</a>
                        <a href="#" data-type="script">Script</a>
                        <a href="#" data-type="variant">Variant</a>
                    </div>
                </div>
            </div>
        `;

        strategiesContent.appendChild(strategySubbox);
        strategySubbox.querySelector('h3').addEventListener('click', () => toggleSubbox(strategySubbox));
        strategySubbox.querySelector('.edit-btn').addEventListener('click', () => editStrategy(strategySubbox));
        strategySubbox.querySelector('.save-btn').addEventListener('click', () => saveStrategy(strategySubbox));
        strategySubbox.querySelector('.copy-btn').addEventListener('click', () => copyStrategy(strategySubbox));
        strategySubbox.querySelector('.delete-btn').addEventListener('click', () => deleteStrategy(strategySubbox));

        strategySubbox.querySelector('.strategy-add-dropdown .dropdown-content').addEventListener('click', (e) => {
            e.preventDefault();
            if (e.target.tagName === 'A') {
                const type = e.target.dataset.type;
                switch(type) {
                    case 'angle':
                        addAngle(strategyCount);
                        break;
                    case 'script':
                        addScript(strategyCount);
                        break;
                    case 'variant':
                        addVariant(strategyCount);
                        break;
                }
            }
        });

        updateStrategyStats(); // Update the strategy stats
    }

    function addAngle(strategyNumber) {
        const anglesContent = document.getElementById('angles-content');
        const angleCount = anglesContent.querySelectorAll('.angle-subbox:not(.ai-generated)').length + 1;

        const angleSubbox = document.createElement('div');
        angleSubbox.className = 'angle-subbox';
        angleSubbox.innerHTML = `
            <div class="dropdown angle-add-left-dropdown">
                <button class="dropdown-btn"><i class="fas fa-chevron-left"></i> Add</button>
                <div class="dropdown-content">
                    <a href="#" data-type="strategy">Strategy</a>
                </div>
            </div>
            <h3>Angle ${angleCount}</h3>
            <div class="tree-graph">
                <i class="fas fa-project-diagram"></i>
                <span class="angle-stats">0 scripts</span>
            </div>
            <div class="subbox-content">
                <label>Nickname</label>
                <input type="text" placeholder="Enter angle nickname" class="large-input">
                <label>Description</label>
                <input type="text" placeholder="Enter angle description" class="large-input">
                <div class="angle-actions">
                    <button class="angle-action-btn edit-btn" title="Edit"><i class="fas fa-edit"></i></button>
                    <button class="angle-action-btn save-btn" title="Save"><i class="fas fa-save"></i></button>
                    <button class="angle-action-btn copy-btn" title="Copy"><i class="fas fa-copy"></i></button>
                    <button class="angle-action-btn delete-btn" title="Delete"><i class="fas fa-trash-alt"></i></button>
                </div>
                <div class="dropdown angle-add-dropdown">
                    <button class="dropdown-btn">Add <i class="fas fa-chevron-right"></i></button>
                    <div class="dropdown-content">
                        <a href="#" data-type="script">Script</a>
                        <a href="#" data-type="variant">Variant</a>
                    </div>
                </div>
            </div>
        `;

        anglesContent.appendChild(angleSubbox);
        angleSubbox.querySelector('h3').addEventListener('click', () => toggleSubbox(angleSubbox));
        angleSubbox.dataset.angle = angleCount;
        updateAngleStats(angleSubbox);
        angleSubbox.querySelector('.edit-btn').addEventListener('click', () => editAngle(angleSubbox));
        angleSubbox.querySelector('.save-btn').addEventListener('click', () => saveAngle(angleSubbox));
        angleSubbox.querySelector('.copy-btn').addEventListener('click', () => copyAngle(angleSubbox));
        angleSubbox.querySelector('.delete-btn').addEventListener('click', () => deleteAngle(angleSubbox));

        angleSubbox.querySelector('.angle-add-dropdown .dropdown-content').addEventListener('click', (e) => {
            e.preventDefault();
            if (e.target.tagName === 'A') {
                const type = e.target.dataset.type;
                switch(type) {
                    case 'script':
                        addScript(strategyNumber, angleCount);
                        break;
                    case 'variant':
                        addVariant(strategyNumber, angleCount);
                        break;
                }
            }
        });

        angleSubbox.querySelector('.angle-add-left-dropdown .dropdown-content').addEventListener('click', (e) => {
            e.preventDefault();
            if (e.target.tagName === 'A') {
                addStrategy();
            }
        });
    }

    function addScript(strategyNumber, angleNumber) {
        const scriptsContent = document.getElementById('scripts-content');
        const scriptCount = scriptsContent.querySelectorAll('.script-subbox:not(.ai-generated)').length + 1;

        const scriptSubbox = document.createElement('div');
        scriptSubbox.className = 'script-subbox';
        scriptSubbox.innerHTML = `
            <div class="dropdown script-add-left-dropdown">
                <button class="dropdown-btn"><i class="fas fa-chevron-left"></i> Add</button>
                <div class="dropdown-content">
                    <a href="#" data-type="strategy">Strategy</a>
                    <a href="#" data-type="angle">Angle</a>
                </div>
            </div>
            <h3>Script ${scriptCount} (Angle ${angleNumber})</h3>
            <div class="tree-graph">
                <i class="fas fa-project-diagram"></i>
                <span class="script-stats">0 variants</span>
            </div>
            <div class="subbox-content">
                <table>
                    <tr>
                        <td><label>Time Stamp</label></td>
                        <td><input type="text" placeholder="Enter time stamp" class="large-input"></td>
                    </tr>
                    <tr>
                        <td><label>Voice Over</label></td>
                        <td><input type="text" placeholder="Enter voice over" class="large-input"></td>
                    </tr>
                    <tr>
                        <td><label>Visual</label></td>
                        <td><input type="text" placeholder="Enter visual" class="large-input"></td>
                    </tr>
                </table>
                <div class="script-actions">
                    <button class="script-action-btn edit-btn" title="Edit"><i class="fas fa-edit"></i></button>
                    <button class="script-action-btn save-btn" title="Save"><i class="fas fa-save"></i></button>
                    <button class="script-action-btn copy-btn" title="Copy"><i class="fas fa-copy"></i></button>
                    <button class="script-action-btn delete-btn" title="Delete"><i class="fas fa-trash-alt"></i></button>
                </div>
                <div class="dropdown script-add-dropdown">
                    <button class="dropdown-btn">Add <i class="fas fa-chevron-right"></i></button>
                    <div class="dropdown-content">
                        <a href="#" data-type="variant">Variant</a>
                    </div>
                </div>
            </div>
        `;

        scriptsContent.appendChild(scriptSubbox);
        scriptSubbox.querySelector('h3').addEventListener('click', () => toggleSubbox(scriptSubbox));
        scriptSubbox.dataset.angle = angleNumber;
        scriptSubbox.dataset.script = scriptCount;
        updateScriptStats(scriptSubbox);
        updateAngleStats(document.querySelector(`.angle-subbox[data-angle="${angleNumber}"]`));
        scriptSubbox.querySelector('.edit-btn').addEventListener('click', () => editScript(scriptSubbox));
        scriptSubbox.querySelector('.save-btn').addEventListener('click', () => saveScript(scriptSubbox));
        scriptSubbox.querySelector('.copy-btn').addEventListener('click', () => copyScript(scriptSubbox));
        scriptSubbox.querySelector('.delete-btn').addEventListener('click', () => deleteScript(scriptSubbox));

        scriptSubbox.querySelector('.script-add-dropdown .dropdown-content').addEventListener('click', (e) => {
            e.preventDefault();
            if (e.target.tagName === 'A') {
                addVariant(strategyNumber, angleNumber, scriptCount);
            }
        });

        scriptSubbox.querySelector('.script-add-left-dropdown .dropdown-content').addEventListener('click', (e) => {
            e.preventDefault();
            if (e.target.tagName === 'A') {
                const type = e.target.dataset.type;
                switch(type) {
                    case 'strategy':
                        addStrategy();
                        break;
                    case 'angle':
                        addAngle(strategyNumber);
                        break;
                }
            }
        });
    }

    function addVariant(scriptSubbox) {
        const variantsContent = document.getElementById('variants-content');
        const variantCount = variantsContent.querySelectorAll('.variant-subbox:not(.ai-generated)').length + 1;
        
        const variantSubbox = document.createElement('div');
        variantSubbox.className = 'variant-subbox';
        variantSubbox.innerHTML = `
            <div class="dropdown variant-add-left-dropdown">
                <button class="dropdown-btn"><i class="fas fa-chevron-left"></i> Add</button>
                <div class="dropdown-content">
                    <a href="#" data-type="strategy">Strategy</a>
                    <a href="#" data-type="angle">Angle</a>
                    <a href="#" data-type="script">Script</a>
                </div>
            </div>
            <h3>Variant ${variantCount}</h3>
            <div class="subbox-content">
                <div class="variant-dropdowns">
                    <select class="region-dropdown">
                        <option value="">Select Region</option>
                        ${regions.map(region => `<option value="${region}">${region}</option>`).join('')}
                    </select>
                    <select class="platform-dropdown">
                        <option value="">Select Platform</option>
                        <option value="Web">Web</option>
                        <option value="Mobile">Mobile</option>
                        <option value="Desktop">Desktop</option>
                    </select>
                    <select class="language-dropdown">
                        <option value="">Select Language</option>
                        <option value="English">English</option>
                        <option value="Spanish">Spanish</option>
                        <option value="French">French</option>
                    </select>
                    <select class="device-dropdown">
                        <option value="">Select Device</option>
                        <option value="Desktop">Desktop</option>
                        <option value="Laptop">Laptop</option>
                        <option value="Tablet">Tablet</option>
                        <option value="Mobile">Mobile</option>
                    </select>
                    <select class="season-dropdown">
                        <option value="">Select Season</option>
                        <option value="Spring">Spring</option>
                        <option value="Summer">Summer</option>
                        <option value="Fall">Fall</option>
                        <option value="Winter">Winter</option>
                    </select>
                </div>
                <input type="text" placeholder="Enter variant content" value="${scriptSubbox.querySelector('input').value}">
                <div class="variant-actions">
                    <button class="variant-action-btn edit-btn" title="Edit"><i class="fas fa-edit"></i></button>
                    <button class="variant-action-btn save-btn" title="Save"><i class="fas fa-save"></i></button>
                    <button class="variant-action-btn copy-btn" title="Copy"><i class="fas fa-copy"></i></button>
                    <button class="variant-action-btn delete-btn" title="Delete"><i class="fas fa-trash-alt"></i></button>
                </div>
            </div>
        `;
        
        const aiGeneratedContent = variantsContent.querySelector('.ai-generated-content');
        if (aiGeneratedContent) {
            variantsContent.insertBefore(variantSubbox, aiGeneratedContent);
        } else {
            variantsContent.appendChild(variantSubbox);
        }

        variantSubbox.querySelector('h3').addEventListener('click', () => toggleSubbox(variantSubbox));
        variantSubbox.querySelector('.edit-btn').addEventListener('click', () => editVariant(variantSubbox));
        variantSubbox.querySelector('.save-btn').addEventListener('click', () => saveVariant(variantSubbox));
        variantSubbox.querySelector('.copy-btn').addEventListener('click', () => copyVariant(variantSubbox));
        variantSubbox.querySelector('.delete-btn').addEventListener('click', () => deleteVariant(variantSubbox));

        const scriptNumber = scriptSubbox.dataset.script;
        const angleNumber = scriptSubbox.dataset.angle;
        variantSubbox.dataset.script = scriptNumber;
        variantSubbox.dataset.angle = angleNumber;
        updateScriptStats(scriptSubbox);
        updateAngleStats(document.querySelector(`.angle-subbox[data-angle="${angleNumber}"]`));

        variantSubbox.querySelector('.variant-add-left-dropdown .dropdown-content').addEventListener('click', (e) => {
            e.preventDefault();
            if (e.target.tagName === 'A') {
                const type = e.target.dataset.type;
                switch(type) {
                    case 'strategy':
                        addStrategy();
                        break;
                    case 'angle':
                        addAngle(scriptSubbox.dataset.strategy);
                        break;
                    case 'script':
                        addScript(scriptSubbox.dataset.strategy, scriptSubbox.dataset.angle);
                        break;
                }
            }
        });
    }

    function toggleSubbox(subbox) {
        const content = subbox.querySelector('.subbox-content');
        const treeGraph = subbox.querySelector('.tree-graph');
        const leftAddButton = subbox.querySelector('.angle-add-left-dropdown, .script-add-left-dropdown, .variant-add-left-dropdown');
        const isCollapsed = subbox.classList.contains('collapsed');
        
        // Collapse all other subboxes of the same type
        const parentContainer = subbox.closest('.box');
        parentContainer.querySelectorAll(`.${subbox.className.split(' ')[0]}`).forEach(box => {
            if (box !== subbox) {
                box.classList.add('collapsed');
                box.querySelector('.subbox-content').style.display = 'none';
                box.querySelector('.tree-graph').style.display = 'none'; // Hide tree-graph
                box.classList.remove('selected');
                const leftAddButton = box.querySelector('.angle-add-left-dropdown, .script-add-left-dropdown, .variant-add-left-dropdown');
                if (leftAddButton) leftAddButton.style.display = 'none';
            }
        });

        if (isCollapsed) {
            subbox.classList.remove('collapsed');
            content.style.display = 'block';
            treeGraph.style.display = 'block'; // Show tree-graph
            if (leftAddButton) leftAddButton.style.display = 'block';
            subbox.classList.add('selected');
            
            // Show related content
            if (subbox.classList.contains('angle-subbox')) {
                showRelatedScripts(subbox);
                hideAllVariants();
            } else if (subbox.classList.contains('script-subbox')) {
                showRelatedVariants(subbox);
            }
        } else {
            subbox.classList.add('collapsed');
            content.style.display = 'none';
            treeGraph.style.display = 'none'; // Hide tree-graph
            if (leftAddButton) leftAddButton.style.display = 'none';
            subbox.classList.remove('selected');
            
            // Hide related content
            if (subbox.classList.contains('angle-subbox')) {
                hideAllScriptsAndVariants();
            } else if (subbox.classList.contains('script-subbox')) {
                hideAllVariants();
            }
        }
    }

    function showRelatedScripts(angleSubbox) {
        const angleNumber = angleSubbox.dataset.angle;
        const scriptsContent = document.getElementById('scripts-content');
        const scripts = scriptsContent.querySelectorAll('.script-subbox');
        
        scripts.forEach(script => {
            if (script.dataset.angle === angleNumber) {
                script.style.display = 'block';
            } else {
                script.style.display = 'none';
            }
        });
    }

    function showRelatedVariants(scriptSubbox) {
        const scriptNumber = scriptSubbox.dataset.script;
        const variantsContent = document.getElementById('variants-content');
        const variants = variantsContent.querySelectorAll('.variant-subbox');
        
        variants.forEach(variant => {
            if (variant.dataset.script === scriptNumber) {
                variant.style.display = 'block';
            } else {
                variant.style.display = 'none';
            }
        });
    }

    function hideAllScriptsAndVariants() {
        const scriptsContent = document.getElementById('scripts-content');
        const variantsContent = document.getElementById('variants-content');
        
        scriptsContent.querySelectorAll('.script-subbox').forEach(script => {
            script.style.display = 'none';
        });
        
        variantsContent.querySelectorAll('.variant-subbox').forEach(variant => {
            variant.style.display = 'none';
        });
    }

    function hideAllVariants() {
        const variantsContent = document.getElementById('variants-content');
        variantsContent.querySelectorAll('.variant-subbox').forEach(variant => {
            variant.style.display = 'none';
        });
    }

    function editAngle(angleSubbox) {
        const input = angleSubbox.querySelector('input');
        input.disabled = false;
        input.focus();
    }

    function saveAngle(angleSubbox) {
        const input = angleSubbox.querySelector('input');
        input.disabled = true;
        console.log('Saved angle:', input.value);
    }

    function copyAngle(angleSubbox) {
        const newAngleSubbox = angleSubbox.cloneNode(true);
        const anglesContent = document.getElementById('angles-content');
        anglesContent.insertBefore(newAngleSubbox, angleSubbox.nextSibling);
        
        const newAngleCount = anglesContent.querySelectorAll('.angle-subbox:not(.ai-generated)').length;
        newAngleSubbox.querySelector('h3').textContent = `Angle ${newAngleCount}`;
        
        newAngleSubbox.querySelector('.edit-btn').addEventListener('click', () => editAngle(newAngleSubbox));
        newAngleSubbox.querySelector('.save-btn').addEventListener('click', () => saveAngle(newAngleSubbox));
        newAngleSubbox.querySelector('.copy-btn').addEventListener('click', () => copyAngle(newAngleSubbox));
        newAngleSubbox.querySelector('.delete-btn').addEventListener('click', () => deleteAngle(newAngleSubbox));
        newAngleSubbox.querySelector('.angle-add-dropdown .dropdown-content').addEventListener('click', (e) => {
            e.preventDefault();
            if (e.target.tagName === 'A') {
                const type = e.target.dataset.type;
                switch(type) {
                    case 'script':
                        addScript(newAngleCount);
                        break;
                    case 'variant':
                        addVariant(newAngleCount);
                        break;
                }
            }
        });

        newAngleSubbox.dataset.angle = newAngleCount;
        updateAngleStats(newAngleSubbox);
    }

    function deleteAngle(angleSubbox) {
        if (confirm('Are you sure you want to delete this angle?')) {
            const angleNumber = angleSubbox.dataset.angle;
            
            // Delete associated scripts and variants
            const scriptsContent = document.getElementById('scripts-content');
            const associatedScripts = scriptsContent.querySelectorAll(`.script-subbox[data-angle="${angleNumber}"]`);
            associatedScripts.forEach(script => {
                deleteScript(script, false); // false to prevent confirmation dialog
            });

            angleSubbox.remove();
            renumberAngles();
        }
    }

    function editScript(scriptSubbox) {
        const input = scriptSubbox.querySelector('input');
        input.disabled = false;
        input.focus();
    }

    function saveScript(scriptSubbox) {
        const input = scriptSubbox.querySelector('input');
        input.disabled = true;
        console.log('Saved script:', input.value);
    }

    function copyScript(scriptSubbox) {
        const newScriptSubbox = scriptSubbox.cloneNode(true);
        const scriptsContent = document.getElementById('scripts-content');
        scriptsContent.insertBefore(newScriptSubbox, scriptSubbox.nextSibling);
        
        const newScriptCount = scriptsContent.querySelectorAll('.script-subbox:not(.ai-generated)').length;
        newScriptSubbox.querySelector('h3').textContent = `Script ${newScriptCount}`;
        
        newScriptSubbox.querySelector('.edit-btn').addEventListener('click', () => editScript(newScriptSubbox));
        newScriptSubbox.querySelector('.save-btn').addEventListener('click', () => saveScript(newScriptSubbox));
        newScriptSubbox.querySelector('.copy-btn').addEventListener('click', () => copyScript(newScriptSubbox));
        newScriptSubbox.querySelector('.delete-btn').addEventListener('click', () => deleteScript(newScriptSubbox));
        newScriptSubbox.querySelector('.script-add-dropdown .dropdown-content').addEventListener('click', (e) => {
            e.preventDefault();
            if (e.target.tagName === 'A') {
                addVariant(newScriptSubbox);
            }
        });

        newScriptSubbox.dataset.angle = scriptSubbox.dataset.angle;
        newScriptSubbox.dataset.script = newScriptCount;
        updateScriptStats(newScriptSubbox);
        updateAngleStats(document.querySelector(`.angle-subbox[data-angle="${scriptSubbox.dataset.angle}"]`));
    }

    function deleteScript(scriptSubbox, showConfirmation = true) {
        if (!showConfirmation || confirm('Are you sure you want to delete this script?')) {
            const scriptNumber = scriptSubbox.dataset.script;
            
            // Delete associated variants
            const variantsContent = document.getElementById('variants-content');
            const associatedVariants = variantsContent.querySelectorAll(`.variant-subbox[data-script="${scriptNumber}"]`);
            associatedVariants.forEach(variant => {
                deleteVariant(variant, false); // false to prevent confirmation dialog
            });

            scriptSubbox.remove();
            renumberScripts();
        }
    }

    function editVariant(variantSubbox) {
        const input = variantSubbox.querySelector('input');
        input.disabled = false;
        input.focus();
    }

    function saveVariant(variantSubbox) {
        const input = variantSubbox.querySelector('input');
        input.disabled = true;
        console.log('Saved variant:', input.value);
    }

    function copyVariant(variantSubbox) {
        const newVariantSubbox = variantSubbox.cloneNode(true);
        const variantsContent = document.getElementById('variants-content');
        variantsContent.insertBefore(newVariantSubbox, variantSubbox.nextSibling);
        
        const newVariantCount = variantsContent.querySelectorAll('.variant-subbox:not(.ai-generated)').length;
        newVariantSubbox.querySelector('h3').textContent = `Variant ${newVariantCount}`;
        
        newVariantSubbox.querySelector('.edit-btn').addEventListener('click', () => editVariant(newVariantSubbox));
        newVariantSubbox.querySelector('.save-btn').addEventListener('click', () => saveVariant(newVariantSubbox));
        newVariantSubbox.querySelector('.copy-btn').addEventListener('click', () => copyVariant(newVariantSubbox));
        newVariantSubbox.querySelector('.delete-btn').addEventListener('click', () => deleteVariant(newVariantSubbox));

        const scriptNumber = variantSubbox.dataset.script;
        const angleNumber = variantSubbox.dataset.angle;
        newVariantSubbox.dataset.script = scriptNumber;
        newVariantSubbox.dataset.angle = angleNumber;
        updateScriptStats(document.querySelector(`.script-subbox[data-script="${scriptNumber}"]`));
        updateAngleStats(document.querySelector(`.angle-subbox[data-angle="${angleNumber}"]`));
    }

    function deleteVariant(variantSubbox, showConfirmation = true) {
        if (!showConfirmation || confirm('Are you sure you want to delete this variant?')) {
            variantSubbox.remove();
            renumberVariants();
        }
    }

    function renumberAngles() {
        const anglesContent = document.getElementById('angles-content');
        const angles = anglesContent.querySelectorAll('.angle-subbox:not(.ai-generated)');
        angles.forEach((angle, index) => {
            const newNumber = index + 1;
            angle.querySelector('h3').textContent = `Angle ${newNumber}`;
            angle.dataset.angle = newNumber;
            
            // Update associated scripts
            const scriptsContent = document.getElementById('scripts-content');
            const associatedScripts = scriptsContent.querySelectorAll(`.script-subbox[data-angle="${newNumber}"]`);
            associatedScripts.forEach(script => {
                const scriptNumber = script.dataset.script;
                script.querySelector('h3').textContent = `Script ${scriptNumber}`;
            });
        });
    }

    function renumberScripts() {
        const scriptsContent = document.getElementById('scripts-content');
        const scripts = scriptsContent.querySelectorAll('.script-subbox:not(.ai-generated)');
        scripts.forEach((script, index) => {
            const newNumber = index + 1;
            const angleNumber = script.dataset.angle;
            script.querySelector('h3').textContent = `Script ${newNumber}`;
            script.dataset.script = newNumber;
            
            // Update associated variants
            const variantsContent = document.getElementById('variants-content');
            const associatedVariants = variantsContent.querySelectorAll(`.variant-subbox[data-script="${newNumber}"]`);
            associatedVariants.forEach(variant => {
                const variantNumber = variant.querySelector('h3').textContent.match(/Variant (\d+)/)[1];
                variant.querySelector('h3').textContent = `Variant ${variantNumber}`;
            });
        });
    }

    function renumberVariants() {
        const variantsContent = document.getElementById('variants-content');
        const variants = variantsContent.querySelectorAll('.variant-subbox:not(.ai-generated)');
        variants.forEach((variant, index) => {
            const newNumber = index + 1;
            const scriptNumber = variant.dataset.script;
            const angleNumber = variant.dataset.angle;
            variant.querySelector('h3').textContent = `Variant ${newNumber}`;
        });
    }

    function updateAngleStats(angleSubbox) {
        const angleNumber = angleSubbox.dataset.angle;
        const scriptsContent = document.getElementById('scripts-content');
        const variantsContent = document.getElementById('variants-content');
        
        const scripts = scriptsContent.querySelectorAll(`.script-subbox[data-angle="${angleNumber}"]`);
        const variants = variantsContent.querySelectorAll(`.variant-subbox[data-angle="${angleNumber}"]`);
        
        const scriptCount = scripts.length;
        const variantCount = variants.length;
        
        const statsText = `${scriptCount} scripts, ${variantCount} variants`;
        angleSubbox.querySelector('.angle-stats').textContent = statsText;
    }

    function updateScriptStats(scriptSubbox) {
        const scriptNumber = scriptSubbox.dataset.script;
        const variantsContent = document.getElementById('variants-content');
        const variants = variantsContent.querySelectorAll(`.variant-subbox[data-script="${scriptNumber}"]`);
        const variantCount = variants.length;
        const statsText = `${variantCount} variants`;
        scriptSubbox.querySelector('.script-stats').textContent = statsText;
    }

    function setupTopDropdowns() {
        const corporateEntityDropdown = document.getElementById('corporate-entity-dropdown');
        const regionDropdown = document.getElementById('region-dropdown');

        corporateEntityDropdown.innerHTML = '<option value="">Select Corporate Entity</option>';
        corporateEntities.forEach(entity => {
            const option = document.createElement('option');
            option.value = entity;
            option.textContent = entity;
            corporateEntityDropdown.appendChild(option);
        });

        regionDropdown.innerHTML = '<option value="">Select Region</option>';
        regions.forEach(region => {
            const option = document.createElement('option');
            option.value = region;
            option.textContent = region;
            regionDropdown.appendChild(option);
        });

        corporateEntityDropdown.addEventListener('change', () => {
            console.log('Corporate Entity selected:', corporateEntityDropdown.value);
        });

        regionDropdown.addEventListener('change', () => {
            console.log('Region selected:', regionDropdown.value);
        });
    }

    function initializeApp() {
        showAllSavedProducts();
        setupTopDropdowns();
    }

    initializeApp();
})();

    initializeApp();


    function updateAngleStats(angleSubbox) {
        const angleNumber = angleSubbox.dataset.angle;
        const scriptsContent = document.getElementById('scripts-content');
        const variantsContent = document.getElementById('variants-content');
        
        const scripts = scriptsContent.querySelectorAll(`.script-subbox[data-angle="${angleNumber}"]`);
        const variants = variantsContent.querySelectorAll(`.variant-subbox[data-angle="${angleNumber}"]`);
        
        const scriptCount = scripts.length;
        const variantCount = variants.length;
        
        const angleStats = angleSubbox.querySelector('.angle-stats');
        angleStats.textContent = `${scriptCount} scripts, ${variantCount} variants`;
    }

    function updateScriptStats(scriptSubbox) {
        const scriptNumber = scriptSubbox.dataset.script;
        const variantsContent = document.getElementById('variants-content');
        
        const variants = variantsContent.querySelectorAll(`.variant-subbox[data-script="${scriptNumber}"]`);
        const variantCount = variants.length;
        
        const scriptStats = scriptSubbox.querySelector('.script-stats');
        scriptStats.textContent = `${variantCount} variants`;
    }

    function setupTopDropdowns() {
        const corporateEntityDropdown = document.getElementById('corporate-entity-dropdown');
        const regionDropdown = document.getElementById('region-dropdown');

        corporateEntityDropdown.innerHTML = '<option value="">Select Corporate Entity</option>';
        corporateEntities.forEach(entity => {
            const option = document.createElement('option');
            option.value = entity;
            option.textContent = entity;
            corporateEntityDropdown.appendChild(option);
        });

        regionDropdown.innerHTML = '<option value="">Select Region</option>';
        regions.forEach(region => {
            const option = document.createElement('option');
            option.value = region;
            option.textContent = region;
            regionDropdown.appendChild(option);
        });

        corporateEntityDropdown.addEventListener('change', () => {
            console.log('Corporate Entity selected:', corporateEntityDropdown.value);
        });

        regionDropdown.addEventListener('change', () => {
            console.log('Region selected:', regionDropdown.value);
        });
    }

    function initializeApp() {
        showAllSavedProducts();
        setupTopDropdowns();
    }

    initializeApp();


    function updateAngleStats(angleSubbox) {
        const angleNumber = angleSubbox.dataset.angle;
        const scriptsContent = document.getElementById('scripts-content');
        const variantsContent = document.getElementById('variants-content');
        
        const scripts = scriptsContent.querySelectorAll(`.script-subbox[data-angle="${angleNumber}"]`);
        const variants = variantsContent.querySelectorAll(`.variant-subbox[data-angle="${angleNumber}"]`);
        
        const scriptCount = scripts.length;
        const variantCount = variants.length;
        
        const angleStats = angleSubbox.querySelector('.angle-stats');
        angleStats.textContent = `${scriptCount} scripts, ${variantCount} variants`;
    }

    function updateScriptStats(scriptSubbox) {
        const scriptNumber = scriptSubbox.dataset.script;
        const variantsContent = document.getElementById('variants-content');
        
        const variants = variantsContent.querySelectorAll(`.variant-subbox[data-script="${scriptNumber}"]`);
        const variantCount = variants.length;
        
        const scriptStats = scriptSubbox.querySelector('.script-stats');
        scriptStats.textContent = `${variantCount} variants`;
    }

    function setupTopDropdowns() {
        const corporateEntityDropdown = document.getElementById('corporate-entity-dropdown');
        const regionDropdown = document.getElementById('region-dropdown');

        corporateEntityDropdown.innerHTML = '<option value="">Select Corporate Entity</option>';
        corporateEntities.forEach(entity => {
            const option = document.createElement('option');
            option.value = entity;
            option.textContent = entity;
            corporateEntityDropdown.appendChild(option);
        });

        regionDropdown.innerHTML = '<option value="">Select Region</option>';
        regions.forEach(region => {
            const option = document.createElement('option');
            option.value = region;
            option.textContent = region;
            regionDropdown.appendChild(option);
        });

        corporateEntityDropdown.addEventListener('change', () => {
            console.log('Corporate Entity selected:', corporateEntityDropdown.value);
        });

        regionDropdown.addEventListener('change', () => {
            console.log('Region selected:', regionDropdown.value);
        });
    }

    function initializeApp() {
        console.log("Initializing app...");
        setupTopDropdowns();
        showAllSavedProducts();
        console.log("App initialization complete");
    }

    document.addEventListener('DOMContentLoaded', initializeApp);


    function updateAngleStats(angleSubbox) {
        const angleNumber = angleSubbox.dataset.angle;
        const scriptsContent = document.getElementById('scripts-content');
        const variantsContent = document.getElementById('variants-content');
        
        const scripts = scriptsContent.querySelectorAll(`.script-subbox[data-angle="${angleNumber}"]`);
        const variants = variantsContent.querySelectorAll(`.variant-subbox[data-angle="${angleNumber}"]`);
        
        const scriptCount = scripts.length;
        const variantCount = variants.length;
        
        const angleStats = angleSubbox.querySelector('.angle-stats');
        angleStats.textContent = `${scriptCount} scripts, ${variantCount} variants`;
    }

    function updateScriptStats(scriptSubbox) {
        const scriptNumber = scriptSubbox.dataset.script;
        const variantsContent = document.getElementById('variants-content');
        
        const variants = variantsContent.querySelectorAll(`.variant-subbox[data-script="${scriptNumber}"]`);
        const variantCount = variants.length;
        
        const scriptStats = scriptSubbox.querySelector('.script-stats');
        scriptStats.textContent = `${variantCount} variants`;
    }

    function setupTopDropdowns() {
        const corporateEntityDropdown = document.getElementById('corporate-entity-dropdown');
        const regionDropdown = document.getElementById('region-dropdown');

        corporateEntityDropdown.innerHTML = '<option value="">Select Corporate Entity</option>';
        corporateEntities.forEach(entity => {
            const option = document.createElement('option');
            option.value = entity;
            option.textContent = entity;
            corporateEntityDropdown.appendChild(option);
        });

        regionDropdown.innerHTML = '<option value="">Select Region</option>';
        regions.forEach(region => {
            const option = document.createElement('option');
            option.value = region;
            option.textContent = region;
            regionDropdown.appendChild(option);
        });

        corporateEntityDropdown.addEventListener('change', () => {
            console.log('Corporate Entity selected:', corporateEntityDropdown.value);
        });

        regionDropdown.addEventListener('change', () => {
            console.log('Region selected:', regionDropdown.value);
        });
    }

    setupTopDropdowns();


    function setupTopDropdowns() {
        const corporateEntityDropdown = document.getElementById('corporate-entity-dropdown');
        const regionDropdown = document.getElementById('region-dropdown');

        // Populate corporate entity dropdown
        corporateEntities.forEach(entity => {
            const option = document.createElement('option');
            option.value = entity;
            option.textContent = entity;
            corporateEntityDropdown.appendChild(option);
        });

        // Populate region dropdown
        regions.forEach(region => {
            const option = document.createElement('option');
            option.value = region;
            option.textContent = region;
            regionDropdown.appendChild(option);
        });

        // Add event listeners
        corporateEntityDropdown.addEventListener('change', function() {
            console.log('Selected Corporate Entity:', this.value);
            // You can add more functionality here if needed
        });

        regionDropdown.addEventListener('change', function() {
            console.log('Selected Region:', this.value);
            // You can add more functionality here if needed
        });
    }

    function initializeApp() {
        console.log("Initializing app...");
        setupTopDropdowns();
        showAllSavedProducts();
        console.log("App initialization complete");
    }

    document.addEventListener('DOMContentLoaded', initializeApp);





    function addAngle() {
        const anglesContent = document.getElementById('angles-content');
        const angleCount = anglesContent.querySelectorAll('.angle-subbox:not(.ai-generated)').length + 1;
        
        const angleSubbox = document.createElement('div');
        angleSubbox.className = 'angle-subbox';
        angleSubbox.innerHTML = `
            <h3>Angle ${angleCount}</h3>
            <div class="subbox-content">
                <input type="text" placeholder="Enter angle description">
                <div class="angle-actions">
                    <button class="angle-action-btn edit-btn" title="Edit"><i class="fas fa-edit"></i></button>
                    <button class="angle-action-btn save-btn" title="Save"><i class="fas fa-save"></i></button>
                    <button class="angle-action-btn copy-btn" title="Copy"><i class="fas fa-copy"></i></button>
                    <button class="angle-action-btn delete-btn" title="Delete"><i class="fas fa-trash-alt"></i></button>
                </div>
                <button class="add-scripts-btn small-btn">Add Scripts</button>
            </div>
        `;
        
        const aiGeneratedContent = anglesContent.querySelector('.ai-generated-content');
        if (aiGeneratedContent) {
            anglesContent.insertBefore(angleSubbox, aiGeneratedContent);
        } else {
            anglesContent.appendChild(angleSubbox);
        }

        angleSubbox.querySelector('h3').addEventListener('click', () => toggleSubbox(angleSubbox));
        angleSubbox.querySelector('.edit-btn').addEventListener('click', () => editAngle(angleSubbox));
        angleSubbox.querySelector('.save-btn').addEventListener('click', () => saveAngle(angleSubbox));
        angleSubbox.querySelector('.copy-btn').addEventListener('click', () => copyAngle(angleSubbox));
        angleSubbox.querySelector('.delete-btn').addEventListener('click', () => deleteAngle(angleSubbox));
        angleSubbox.querySelector('.add-scripts-btn').addEventListener('click', () => addScript(angleCount));
    }

    function addScript(angleNumber) {
        const scriptsContent = document.getElementById('scripts-content');
        const scriptCount = scriptsContent.querySelectorAll('.script-subbox:not(.ai-generated)').length + 1;
        
        const scriptSubbox = document.createElement('div');
        scriptSubbox.className = 'script-subbox';
        scriptSubbox.innerHTML = `
            <h3>Script ${scriptCount} (Angle ${angleNumber})</h3>
            <div class="subbox-content">
                <input type="text" placeholder="Enter script content">
                <div class="script-actions">
                    <button class="script-action-btn edit-btn" title="Edit"><i class="fas fa-edit"></i></button>
                    <button class="script-action-btn save-btn" title="Save"><i class="fas fa-save"></i></button>
                    <button class="script-action-btn copy-btn" title="Copy"><i class="fas fa-copy"></i></button>
                    <button class="script-action-btn delete-btn" title="Delete"><i class="fas fa-trash-alt"></i></button>
                </div>
                <button class="add-variant-btn small-btn">Add Variant</button>
            </div>
        `;
        
        const aiGeneratedContent = scriptsContent.querySelector('.ai-generated-content');
        if (aiGeneratedContent) {
            scriptsContent.insertBefore(scriptSubbox, aiGeneratedContent);
        } else {
            scriptsContent.appendChild(scriptSubbox);
        }

        scriptSubbox.querySelector('h3').addEventListener('click', () => toggleSubbox(scriptSubbox));
        scriptSubbox.querySelector('.edit-btn').addEventListener('click', () => editScript(scriptSubbox));
        scriptSubbox.querySelector('.save-btn').addEventListener('click', () => saveScript(scriptSubbox));
        scriptSubbox.querySelector('.copy-btn').addEventListener('click', () => copyScript(scriptSubbox));
        scriptSubbox.querySelector('.delete-btn').addEventListener('click', () => deleteScript(scriptSubbox));
        scriptSubbox.querySelector('.add-variant-btn').addEventListener('click', () => addVariant(scriptSubbox));
    }

    function addVariant(scriptSubbox) {
        const variantsContent = document.getElementById('variants-content');
        const variantCount = variantsContent.querySelectorAll('.variant-subbox:not(.ai-generated)').length + 1;
        
        const variantSubbox = document.createElement('div');
        variantSubbox.className = 'variant-subbox';
        variantSubbox.innerHTML = `
            <h3>Variant ${variantCount}</h3>
            <div class="subbox-content">
                <div class="variant-dropdowns">
                    <select class="region-dropdown">
                        <option value="">Select Region</option>
                        ${regions.map(region => `<option value="${region}">${region}</option>`).join('')}
                    </select>
                    <select class="platform-dropdown">
                        <option value="">Select Platform</option>
                        <option value="Web">Web</option>
                        <option value="Mobile">Mobile</option>
                        <option value="Desktop">Desktop</option>
                    </select>
                    <select class="language-dropdown">
                        <option value="">Select Language</option>
                        <option value="English">English</option>
                        <option value="Spanish">Spanish</option>
                        <option value="French">French</option>
                    </select>
                    <select class="device-dropdown">
                        <option value="">Select Device</option>
                        <option value="Desktop">Desktop</option>
                        <option value="Laptop">Laptop</option>
                        <option value="Tablet">Tablet</option>
                        <option value="Mobile">Mobile</option>
                    </select>
                    <select class="season-dropdown">
                        <option value="">Select Season</option>
                        <option value="Spring">Spring</option>
                        <option value="Summer">Summer</option>
                        <option value="Fall">Fall</option>
                        <option value="Winter">Winter</option>
                    </select>
                </div>
                <input type="text" placeholder="Enter variant content" value="${scriptSubbox.querySelector('input').value}">
                <div class="variant-actions">
                    <button class="variant-action-btn edit-btn" title="Edit"><i class="fas fa-edit"></i></button>
                    <button class="variant-action-btn save-btn" title="Save"><i class="fas fa-save"></i></button>
                    <button class="variant-action-btn copy-btn" title="Copy"><i class="fas fa-copy"></i></button>
                    <button class="variant-action-btn delete-btn" title="Delete"><i class="fas fa-trash-alt"></i></button>
                </div>
            </div>
        `;
        
        const aiGeneratedContent = variantsContent.querySelector('.ai-generated-content');
        if (aiGeneratedContent) {
            variantsContent.insertBefore(variantSubbox, aiGeneratedContent);
        } else {
            variantsContent.appendChild(variantSubbox);
        }

        variantSubbox.querySelector('h3').addEventListener('click', () => toggleSubbox(variantSubbox));
        variantSubbox.querySelector('.edit-btn').addEventListener('click', () => editVariant(variantSubbox));
        variantSubbox.querySelector('.save-btn').addEventListener('click', () => saveVariant(variantSubbox));
        variantSubbox.querySelector('.copy-btn').addEventListener('click', () => copyVariant(variantSubbox));
        variantSubbox.querySelector('.delete-btn').addEventListener('click', () => deleteVariant(variantSubbox));
    }

    function toggleSubbox(subbox) {
        const content = subbox.querySelector('.subbox-content');
        const isCollapsed = subbox.classList.contains('collapsed');
        
        // Collapse all other subboxes of the same type
        const parentContainer = subbox.closest('.box');
        parentContainer.querySelectorAll(`.${subbox.className.split(' ')[0]}`).forEach(box => {
            if (box !== subbox) {
                box.classList.add('collapsed');
                box.querySelector('.subbox-content').style.display = 'none';
                box.classList.remove('selected');
            }
        });

        if (isCollapsed) {
            subbox.classList.remove('collapsed');
            content.style.display = 'block';
            subbox.classList.add('selected');
        } else {
            subbox.classList.add('collapsed');
            content.style.display = 'none';
            subbox.classList.remove('selected');
        }
    }

    function editAngle(angleSubbox) {
        const input = angleSubbox.querySelector('input');
        input.disabled = false;
        input.focus();
    }

    function saveAngle(angleSubbox) {
        const input = angleSubbox.querySelector('input');
        input.disabled = true;
        console.log('Saved angle:', input.value);
    }

    function copyAngle(angleSubbox) {
        const newAngleSubbox = angleSubbox.cloneNode(true);
        const anglesContent = document.getElementById('angles-content');
        anglesContent.insertBefore(newAngleSubbox, angleSubbox.nextSibling);
        
        const newAngleCount = anglesContent.querySelectorAll('.angle-subbox:not(.ai-generated)').length;
        newAngleSubbox.querySelector('h3').textContent = `Angle ${newAngleCount}`;
        
        newAngleSubbox.querySelector('.edit-btn').addEventListener('click', () => editAngle(newAngleSubbox));
        newAngleSubbox.querySelector('.save-btn').addEventListener('click', () => saveAngle(newAngleSubbox));
        newAngleSubbox.querySelector('.copy-btn').addEventListener('click', () => copyAngle(newAngleSubbox));
        newAngleSubbox.querySelector('.delete-btn').addEventListener('click', () => deleteAngle(newAngleSubbox));
        newAngleSubbox.querySelector('.add-scripts-btn').addEventListener('click', () => addScript(newAngleCount));
    }

    function deleteAngle(angleSubbox) {
        if (confirm('Are you sure you want to delete this angle?')) {
            angleSubbox.remove();
        }
    }

    function editScript(scriptSubbox) {
        const input = scriptSubbox.querySelector('input');
        input.disabled = false;
        input.focus();
    }

    function saveScript(scriptSubbox) {
        const input = scriptSubbox.querySelector('input');
        input.disabled = true;
        console.log('Saved script:', input.value);
    }

    function copyScript(scriptSubbox) {
        const newScriptSubbox = scriptSubbox.cloneNode(true);
        const scriptsContent = document.getElementById('scripts-content');
        scriptsContent.insertBefore(newScriptSubbox, scriptSubbox.nextSibling);
        
        const newScriptCount = scriptsContent.querySelectorAll('.script-subbox:not(.ai-generated)').length;
        newScriptSubbox.querySelector('h3').textContent = `Script ${newScriptCount}`;
        
        newScriptSubbox.querySelector('.edit-btn').addEventListener('click', () => editScript(newScriptSubbox));
        newScriptSubbox.querySelector('.save-btn').addEventListener('click', () => saveScript(newScriptSubbox));
        newScriptSubbox.querySelector('.copy-btn').addEventListener('click', () => copyScript(newScriptSubbox));
        newScriptSubbox.querySelector('.delete-btn').addEventListener('click', () => deleteScript(newScriptSubbox));
        newScriptSubbox.querySelector('.add-variant-btn').addEventListener('click', () => addVariant(newScriptSubbox));
    }

    function deleteScript(scriptSubbox) {
        if (confirm('Are you sure you want to delete this script?')) {
            scriptSubbox.remove();
        }
    }

    function editVariant(variantSubbox) {
        const input = variantSubbox.querySelector('input');
        input.disabled = false;
        input.focus();
    }

    function saveVariant(variantSubbox) {
        const input = variantSubbox.querySelector('input');
        input.disabled = true;
        console.log('Saved variant:', input.value);
    }

    function copyVariant(variantSubbox) {
        const newVariantSubbox = variantSubbox.cloneNode(true);
        const variantsContent = document.getElementById('variants-content');
        variantsContent.insertBefore(newVariantSubbox, variantSubbox.nextSibling);
        
        const newVariantCount = variantsContent.querySelectorAll('.variant-subbox:not(.ai-generated)').length;
        newVariantSubbox.querySelector('h3').textContent = `Variant ${newVariantCount}`;
        
        newVariantSubbox.querySelector('.edit-btn').addEventListener('click', () => editVariant(newVariantSubbox));
        newVariantSubbox.querySelector('.save-btn').addEventListener('click', () => saveVariant(newVariantSubbox));
        newVariantSubbox.querySelector('.copy-btn').addEventListener('click', () => copyVariant(newVariantSubbox));
        newVariantSubbox.querySelector('.delete-btn').addEventListener('click', () => deleteVariant(newVariantSubbox));
    }

    function deleteVariant(variantSubbox) {
        if (confirm('Are you sure you want to delete this variant?')) {
            variantSubbox.remove();
        }
    }

    function setupTopDropdowns() {
        const corporateEntityDropdown = document.getElementById('corporate-entity-dropdown');
        const regionDropdown = document.getElementById('region-dropdown');

        // Populate corporate entity dropdown
        corporateEntities.forEach(entity => {
            const option = document.createElement('option');
            option.value = entity;
            option.textContent = entity;
            corporateEntityDropdown.appendChild(option);
        });

        // Populate region dropdown
        regions.forEach(region => {
            const option = document.createElement('option');
            option.value = region;
            option.textContent = region;
            regionDropdown.appendChild(option);
        });

        // Add event listeners
        corporateEntityDropdown.addEventListener('change', function() {
            console.log('Selected Corporate Entity:', this.value);
            // You can add more functionality here if needed
        });

        regionDropdown.addEventListener('change', function() {
            console.log('Selected Region:', this.value);
            // You can add more functionality here if needed
        });
    }

    function initializeApp() {
        console.log("Initializing app...");
        setupTopDropdowns();
        showAllSavedProducts();
        console.log("App initialization complete");
    }

    document.addEventListener('DOMContentLoaded', initializeApp);


    function addAngle() {
        const anglesContent = document.getElementById('angles-content');
        const angleCount = anglesContent.querySelectorAll('.angle-subbox:not(.ai-generated)').length + 1;
        
        const angleSubbox = document.createElement('div');
        angleSubbox.className = 'angle-subbox';
        angleSubbox.innerHTML = `
            <h3>Angle ${angleCount}</h3>
            <div class="subbox-content">
                <input type="text" placeholder="Enter angle description">
                <div class="angle-actions">
                    <button class="angle-action-btn edit-btn" title="Edit"><i class="fas fa-edit"></i></button>
                    <button class="angle-action-btn save-btn" title="Save"><i class="fas fa-save"></i></button>
                    <button class="angle-action-btn copy-btn" title="Copy"><i class="fas fa-copy"></i></button>
                    <button class="angle-action-btn delete-btn" title="Delete"><i class="fas fa-trash-alt"></i></button>
                </div>
                <button class="add-scripts-btn small-btn">Add Scripts</button>
            </div>
        `;
        
        const aiGeneratedContent = anglesContent.querySelector('.ai-generated-content');
        if (aiGeneratedContent) {
            anglesContent.insertBefore(angleSubbox, aiGeneratedContent);
        } else {
            anglesContent.appendChild(angleSubbox);
        }

        angleSubbox.querySelector('h3').addEventListener('click', () => toggleSubbox(angleSubbox));
        angleSubbox.querySelector('.edit-btn').addEventListener('click', () => editAngle(angleSubbox));


    function addAngle() {
        const anglesContent = document.getElementById('angles-content');
        const angleCount = anglesContent.querySelectorAll('.angle-subbox:not(.ai-generated)').length + 1;
        
        const angleSubbox = document.createElement('div');
        angleSubbox.className = 'angle-subbox';
        angleSubbox.innerHTML = `
            <h3>Angle ${angleCount}</h3>
            <div class="subbox-content">
                <input type="text" placeholder="Enter angle description">
                <div class="angle-actions">
                    <button class="angle-action-btn edit-btn" title="Edit"><i class="fas fa-edit"></i></button>
                    <button class="angle-action-btn save-btn" title="Save"><i class="fas fa-save"></i></button>
                    <button class="angle-action-btn copy-btn" title="Copy"><i class="fas fa-copy"></i></button>
                    <button class="angle-action-btn delete-btn" title="Delete"><i class="fas fa-trash-alt"></i></button>
                </div>
                <button class="add-scripts-btn small-btn">Add Scripts</button>
            </div>
        `;
        
        const aiGeneratedContent = anglesContent.querySelector('.ai-generated-content');
        if (aiGeneratedContent) {
            anglesContent.insertBefore(angleSubbox, aiGeneratedContent);
        } else {
            anglesContent.appendChild(angleSubbox);
        }

        angleSubbox.querySelector('h3').addEventListener('click', () => toggleSubbox(angleSubbox));
        angleSubbox.querySelector('.edit-btn').addEventListener('click', () => editAngle(angleSubbox));
        angleSubbox.querySelector('.save-btn').addEventListener('click', () => saveAngle(angleSubbox));
        angleSubbox.querySelector('.copy-btn').addEventListener('click', () => copyAngle(angleSubbox));
        angleSubbox.querySelector('.delete-btn').addEventListener('click', () => deleteAngle(angleSubbox));
        angleSubbox.querySelector('.add-scripts-btn').addEventListener('click', () => addScript(angleCount));
    }

    function addScript(angleNumber) {
        const scriptsContent = document.getElementById('scripts-content');
        const scriptCount = scriptsContent.querySelectorAll('.script-subbox:not(.ai-generated)').length + 1;
        
        const scriptSubbox = document.createElement('div');
        scriptSubbox.className = 'script-subbox';
        scriptSubbox.innerHTML = `
            <h3>Script ${scriptCount} (Angle ${angleNumber})</h3>
            <div class="subbox-content">
                <input type="text" placeholder="Enter script content">
                <div class="script-actions">
                    <button class="script-action-btn edit-btn" title="Edit"><i class="fas fa-edit"></i></button>
                    <button class="script-action-btn save-btn" title="Save"><i class="fas fa-save"></i></button>
                    <button class="script-action-btn copy-btn" title="Copy"><i class="fas fa-copy"></i></button>
                    <button class="script-action-btn delete-btn" title="Delete"><i class="fas fa-trash-alt"></i></button>
                </div>
                <button class="add-variant-btn small-btn">Add Variant</button>
            </div>
        `;
        
        const aiGeneratedContent = scriptsContent.querySelector('.ai-generated-content');
        if (aiGeneratedContent) {
            scriptsContent.insertBefore(scriptSubbox, aiGeneratedContent);
        } else {
            scriptsContent.appendChild(scriptSubbox);
        }

        scriptSubbox.querySelector('h3').addEventListener('click', () => toggleSubbox(scriptSubbox));
        scriptSubbox.querySelector('.edit-btn').addEventListener('click', () => editScript(scriptSubbox));
        scriptSubbox.querySelector('.save-btn').addEventListener('click', () => saveScript(scriptSubbox));
        scriptSubbox.querySelector('.copy-btn').addEventListener('click', () => copyScript(scriptSubbox));
        scriptSubbox.querySelector('.delete-btn').addEventListener('click', () => deleteScript(scriptSubbox));
        scriptSubbox.querySelector('.add-variant-btn').addEventListener('click', () => addVariant(scriptSubbox));
    }

    function addVariant(scriptSubbox) {
        const variantsContent = document.getElementById('variants-content');
        const variantCount = variantsContent.querySelectorAll('.variant-subbox:not(.ai-generated)').length + 1;
        
        const variantSubbox = document.createElement('div');
        variantSubbox.className = 'variant-subbox';
        variantSubbox.innerHTML = `
            <h3>Variant ${variantCount}</h3>
            <div class="subbox-content">
                <div class="variant-dropdowns">
                    <select class="region-dropdown">
                        <option value="">Select Region</option>
                        ${regions.map(region => `<option value="${region}">${region}</option>`).join('')}
                    </select>
                    <select class="platform-dropdown">
                        <option value="">Select Platform</option>
                        <option value="Web">Web</option>
                        <option value="Mobile">Mobile</option>
                        <option value="Desktop">Desktop</option>
                    </select>
                    <select class="language-dropdown">
                        <option value="">Select Language</option>
                        <option value="English">English</option>
                        <option value="Spanish">Spanish</option>
                        <option value="French">French</option>
                    </select>
                    <select class="device-dropdown">
                        <option value="">Select Device</option>
                        <option value="Desktop">Desktop</option>
                        <option value="Laptop">Laptop</option>
                        <option value="Tablet">Tablet</option>
                        <option value="Mobile">Mobile</option>
                    </select>
                    <select class="season-dropdown">
                        <option value="">Select Season</option>
                        <option value="Spring">Spring</option>
                        <option value="Summer">Summer</option>
                        <option value="Fall">Fall</option>
                        <option value="Winter">Winter</option>
                    </select>
                </div>
                <input type="text" placeholder="Enter variant content" value="${scriptSubbox.querySelector('input').value}">
                <div class="variant-actions">
                    <button class="variant-action-btn edit-btn" title="Edit"><i class="fas fa-edit"></i></button>
                    <button class="variant-action-btn save-btn" title="Save"><i class="fas fa-save"></i></button>
                    <button class="variant-action-btn copy-btn" title="Copy"><i class="fas fa-copy"></i></button>
                    <button class="variant-action-btn delete-btn" title="Delete"><i class="fas fa-trash-alt"></i></button>
                </div>
            </div>
        `;
        
        const aiGeneratedContent = variantsContent.querySelector('.ai-generated-content');
        if (aiGeneratedContent) {
            variantsContent.insertBefore(variantSubbox, aiGeneratedContent);
        } else {
            variantsContent.appendChild(variantSubbox);
        }

        variantSubbox.querySelector('h3').addEventListener('click', () => toggleSubbox(variantSubbox));
        variantSubbox.querySelector('.edit-btn').addEventListener('click', () => editVariant(variantSubbox));
        variantSubbox.querySelector('.save-btn').addEventListener('click', () => saveVariant(variantSubbox));
        variantSubbox.querySelector('.copy-btn').addEventListener('click', () => copyVariant(variantSubbox));
        variantSubbox.querySelector('.delete-btn').addEventListener('click', () => deleteVariant(variantSubbox));
    }

    function toggleSubbox(subbox) {
        const content = subbox.querySelector('.subbox-content');
        const isCollapsed = subbox.classList.contains('collapsed');
        
        // Collapse all other subboxes of the same type
        const parentContainer = subbox.closest('.box');
        parentContainer.querySelectorAll(`.${subbox.className.split(' ')[0]}`).forEach(box => {
            if (box !== subbox) {
                box.classList.add('collapsed');
                box.querySelector('.subbox-content').style.display = 'none';
                box.classList.remove('selected');
            }
        });

        if (isCollapsed) {
            subbox.classList.remove('collapsed');
            content.style.display = 'block';
            subbox.classList.add('selected');
        } else {
            subbox.classList.add('collapsed');
            content.style.display = 'none';
            subbox.classList.remove('selected');
        }
    }

    function editAngle(angleSubbox) {
        const input = angleSubbox.querySelector('input');
        input.disabled = false;
        input.focus();
    }

    function saveAngle(angleSubbox) {
        const input = angleSubbox.querySelector('input');
        input.disabled = true;
        console.log('Saved angle:', input.value);
    }

    function copyAngle(angleSubbox) {
        const newAngleSubbox = angleSubbox.cloneNode(true);
        const anglesContent = document.getElementById('angles-content');
        anglesContent.insertBefore(newAngleSubbox, angleSubbox.nextSibling);
        
        const newAngleCount = anglesContent.querySelectorAll('.angle-subbox:not(.ai-generated)').length;
        newAngleSubbox.querySelector('h3').textContent = `Angle ${newAngleCount}`;
        
        newAngleSubbox.querySelector('.edit-btn').addEventListener('click', () => editAngle(newAngleSubbox));
        newAngleSubbox.querySelector('.save-btn').addEventListener('click', () => saveAngle(newAngleSubbox));
        newAngleSubbox.querySelector('.copy-btn').addEventListener('click', () => copyAngle(newAngleSubbox));
        newAngleSubbox.querySelector('.delete-btn').addEventListener('click', () => deleteAngle(newAngleSubbox));
        newAngleSubbox.querySelector('.add-scripts-btn').addEventListener('click', () => addScript(newAngleCount));
    }

    function deleteAngle(angleSubbox) {
        if (confirm('Are you sure you want to delete this angle?')) {
            angleSubbox.remove();
        }
    }

    function editScript(scriptSubbox) {
        const input = scriptSubbox.querySelector('input');
        input.disabled = false;
        input.focus();
    }

    function saveScript(scriptSubbox) {
        const input = scriptSubbox.querySelector('input');
        input.disabled = true;
        console.log('Saved script:', input.value);
    }

    function copyScript(scriptSubbox) {
        const newScriptSubbox = scriptSubbox.cloneNode(true);
        const scriptsContent = document.getElementById('scripts-content');
        scriptsContent.insertBefore(newScriptSubbox, scriptSubbox.nextSibling);
        
        const newScriptCount = scriptsContent.querySelectorAll('.script-subbox:not(.ai-generated)').length;
        newScriptSubbox.querySelector('h3').textContent = `Script ${newScriptCount}`;
        
        newScriptSubbox.querySelector('.edit-btn').addEventListener('click', () => editScript(newScriptSubbox));
        newScriptSubbox.querySelector('.save-btn').addEventListener('click', () => saveScript(newScriptSubbox));
        newScriptSubbox.querySelector('.copy-btn').addEventListener('click', () => copyScript(newScriptSubbox));
        newScriptSubbox.querySelector('.delete-btn').addEventListener('click', () => deleteScript(newScriptSubbox));
        newScriptSubbox.querySelector('.add-variant-btn').addEventListener('click', () => addVariant(newScriptSubbox));
    }

    function deleteScript(scriptSubbox) {
        if (confirm('Are you sure you want to delete this script?')) {
            scriptSubbox.remove();
        }
    }

    function editVariant(variantSubbox) {
        const input = variantSubbox.querySelector('input');
        input.disabled = false;
        input.focus();
    }

    function saveVariant(variantSubbox) {
        const input = variantSubbox.querySelector('input');
        input.disabled = true;
        console.log('Saved variant:', input.value);
    }

    function copyVariant(variantSubbox) {
        const newVariantSubbox = variantSubbox.cloneNode(true);
        const variantsContent = document.getElementById('variants-content');
        variantsContent.insertBefore(newVariantSubbox, variantSubbox.nextSibling);
        
        const newVariantCount = variantsContent.querySelectorAll('.variant-subbox:not(.ai-generated)').length;
        newVariantSubbox.querySelector('h3').textContent = `Variant ${newVariantCount}`;
        
        newVariantSubbox.querySelector('.edit-btn').addEventListener('click', () => editVariant(newVariantSubbox));
        newVariantSubbox.querySelector('.save-btn').addEventListener('click', () => saveVariant(newVariantSubbox));
        newVariantSubbox.querySelector('.copy-btn').addEventListener('click', () => copyVariant(newVariantSubbox));
        newVariantSubbox.querySelector('.delete-btn').addEventListener('click', () => deleteVariant(newVariantSubbox));
    }

    function deleteVariant(variantSubbox) {
        if (confirm('Are you sure you want to delete this variant?')) {
            variantSubbox.remove();
        }
    }

}