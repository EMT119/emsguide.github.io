let buttons = document.querySelectorAll("button");

buttons.forEach((e) => {
    e.addEventListener("click", (btn) => {
        let currentValue = document.getElementById("current");
        let btnText = btn.target.innerText;
        if (isNaN(btnText)) {
            switch (btnText) {
                case "lb to kg":
                    //convert weight to kg
                    currentValue.value = Math.round(currentValue.value/2.2);
                    break;
                case "Clear":
                    currentValue.value = "";
                    break;
                case "=":
                    currentValue.value = math.evaluate(currentValue.value);
                    break;
                default:
                    currentValue.value += btnText;
                    break;
            }
        } else {
            currentValue.value += btnText;
        }
    });
});

function openNav(status) {
    if (status == true) {
        document.getElementById("nav").style.width = "250px";
    } else {
        document.getElementById("nav").style.width = "0px";
    }
}