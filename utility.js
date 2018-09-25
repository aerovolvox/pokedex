new Vue({
                el: '#app',
                data:{
                    id:null,
                    name:'',
                    image:null,
                    idOrName:null,
                    page:0,
                    abilities:null,
                    sensor:0,
                },
                methods:{
                    getInfo(){
                        var parameter;
                        if(this.idOrName){
                            parameter = this.id;
                            if(isNaN(parseInt(parameter)))
                                return;
                        }
                        else
                            parameter = this.name.toLowerCase();
                        this.fetchPokemon(parameter);
                    },
                    active(param){
                        if(param=='id'){
                            this.idOrName = true;
                        }
                        else{
                            this.idOrName = false;
                        }
                    },
                    nextPage(){
                        this.page = !this.page;
                    },
                    nextPokemon(){        
                        if(this.id==802 || this.id==null)
                            this.id=1;
                        else
                            this.id++;
                        this.fetchPokemon(this.id);

                    },
                    previousPokemon(){
                        if(this.id==1 || this.id==null)
                            this.id=802;
                        else
                            this.id--;
                        this.fetchPokemon(this.id);
                    },

                    fetchPokemon(parameter){
                        this.sensor=1;
                        fetch(`https://pokeapi.co/api/v2/pokemon/${parameter}/`)
                            .then(result => result.json())
                            .then(json => {this.image = json.sprites.front_default;
                                           this.id = json.id;
                                           this.name = json.name;
                                           this.abilities = json.abilities;
                                          })
                            .then(dummy => this.sensor=0)
                            .catch(err => {this.sensor=0;console.e(err)});

                    }

                }

            });
