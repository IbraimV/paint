function setup () {
    let canvas = createCanvas(1000,500);
    canvas.parent('canvas-wrapper')
    background('255');
}
function mouseDragged(){
    let type = '';
    if($('#eraser').is(':checked')) {
        type = 'eraser';
    } else if ($('#pen-brush').is(':checked')) {
        type = 'brush';
    } else {
        type = 'pencil';
    }
    let size = parseInt($('#pen-size').val());
    let color = $('#pen-color').val();
    fill(color);
    stroke(color);
    strokeWeight(size);
    if ( type == 'pencil') {
        line(pmouseX, pmouseY, mouseX, mouseY);
    } else if(type == 'eraser') {
        stroke('255');
        line(pmouseX, pmouseY, mouseX, mouseY);
    } else {
        ellipse(pmouseX, pmouseY, size, size);
    }
}
$('#reset-canvas').on('click',function (){
    background(255);
})
function saveImg() {
    let c = $('#canvas-wrapper').find('canvas');
    let imageData = c[0].toDataURL('image/png'); // produces a base64 image string
    $.ajax({
        type: "POST",
        url: "processes.php",
        data: {img: imageData},
        contentType: "application/x-www-form-urlencoded;charset=UTF-8",
        success: function(data){
            if(data.response == 'success'){
                alert(data.message);
                let imageHTML = '<div><img class="gallery-item" width="100%" src="' + data.image + '"><a download="" href="'+ data.image + '">Скачать</a></div>';
                $('.gallery').append(imageHTML);
            } else {
                alert(data.message);
            }
        }
    });
}