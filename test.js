const switcher = {
    on: false,
    activate: function () {this.on = true},
    deactivate: function () {this.on = false},
    getInfo: function () {
        let state = (this.on) ? 'activated' : 'deactivated'
        console.log(this.type.toUpperCase() + ' theme is ' + state)
    }
}

const lightTheme = Object.assign(Object.create(switcher), {type: 'light'})
const darkTheme = Object.assign(Object.create(switcher), {type: 'dark'})

lightTheme.getInfo()
lightTheme.activate()
lightTheme.getInfo()

darkTheme.getInfo()
darkTheme.activate()
darkTheme.getInfo()

const themeController = {
    current: lightTheme,
    init: function(){
        this.current.activate()
    },
    toggle: function (){
        if(this.current.type === lightTheme.type){
            this.current.deactivate()
            this.current = darkTheme
            this.current.activate()
        }else{
            this.current.deactivate()
            this.current = lightTheme
            this.current.activate()
        }
    },
    currentTheme: function (){this.current.getInfo()}
}

themeController.init()
themeController.currentTheme()
themeController.toggle()
themeController.currentTheme()
themeController.toggle()
themeController.currentTheme()
themeController.toggle()
themeController.currentTheme()

class Switcher{
    constructor() {
        this.on = false
    }
    activate() {this.on = true}
    deactivate() {this.on = false}
    getState() {return (this.on) ? 'activated' : 'deactivated'}
}

class LightTheme extends Switcher{
    constructor() {
        super()
        this.type = 'light'
    }

    getInfo(){console.log(this.type.toUpperCase() + ' theme is ' + this.getState())}
}
