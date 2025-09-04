const app = Vue.createApp({
    data() {
        return {
            open: false,
            spawnopen: false,
            vehopen: false,
            components: [
                {icon: 'tire', name: '0', customicon: true, func: () => {this.tire(0)}},
                {icon: 'tire', name: '1', customicon: true, func: () => {this.tire(1)}},
                {icon: 'tire', name: '2', customicon: true, func: () => {this.tire(2)}},
                {icon: 'tire', name: '3', customicon: true, func: () => {this.tire(3)}},
                {icon: 'fl-door', name: '3', customicon: true, func: () => {this.door(0)}},
                {icon: 'fr-door', name: '3', customicon: true, func: () => {this.door(1)}},
                {icon: 'rl-door', name: '3', customicon: true, func: () => {this.door(2)}},
                {icon: 'rr-door', name: '3', customicon: true, func: () => {this.door(3)}},
                {icon: 'hood', name: '3', customicon: true, func: () => {this.door(4)}},
                {icon: 'trunk', name: '3', customicon: true, func: () => {this.door(5)}},
            ]
        }
    },
    computed: {

    },
    methods: {
        key(e){if(e.key === 'Escape'){this.closepanel()}},
        closepanel(){
            fetch(`https://${GetParentResourceName()}/close`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({})
            })
            .then(r => {
                if (r.ok){
                    this.OpenPanel(!this.open)
                }
            })
        },
        OpenPanel(s){
            const main = document.querySelector('.panelhead')
            if (s){
                this.open = true
                main.style = 'animation: megnyit 0.2s ease-in;'
                setTimeout(() => {
                    main.style = 'opacity: 1'
                }, 190)
            } else {
                if (this.spawnopen){this.OpenSpawn(!this.spawnopen)}
                setTimeout(() => {
                    main.style = 'animation: osszecsuk 0.2s ease-in;'
                    setTimeout(() => {
                        main.style = 'opacity: 0'
                        this.open = false
                    }, 190)  
                }, 300);
            }
        },
        FixVeh(){
            fetch(`https://${GetParentResourceName()}/fix`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({})
            })
            .then(r => {
                if (r.ok){
                    this.closepanel()
                }
            })
        },
        Replace(){
            fetch(`https://${GetParentResourceName()}/replace`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({})
            })
            .then(r => {
                if (r.ok){
                    this.closepanel()
                }
            })
        },
        Clean(){
            fetch(`https://${GetParentResourceName()}/clean`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({})
            })
            .then(r => {
                if (r.ok){
                    this.closepanel()
                }
            })
        },
        OpenSpawn() {
            const main = document.querySelector('.panelhead');
            if (!this.spawnopen) {
                this.spawnopen = true;
                main.style.animation = 'felcsusz 0.3s ease-in';
                setTimeout(() => {
                    main.style.top = '20%';
                    main.style.animation = '';
                    this.vehopen = true
                }, 290);
            } else {
                main.style.animation = 'lecsusz 0.3s ease-in';
                this.vehopen = false
                setTimeout(() => {
                    main.style.top = '50%';
                    main.style.animation = '';
                    this.spawnopen = false;
                }, 290);
            }
        },
        tire(n){
            fetch(`https://${GetParentResourceName()}/tireremove`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(n)
            })
            .then(r => {
                if (r.ok){
                    //
                }
            })
        },
        door(n){
            fetch(`https://${GetParentResourceName()}/doorremove`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(n)
            })
            .then(r => {
                if (r.ok){
                    //
                }
            })
        }
    },
    mounted() {
        window.addEventListener('message', (e) => {
            const item = e.data
            switch(item.type){
                case 'open':
                    this.OpenPanel(!this.open)
                    break
                default:
                    break
            }
        })

        window.addEventListener('keydown', this.key)
    },
})
app.mount('#app');