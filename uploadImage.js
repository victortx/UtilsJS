/* is funciotn in html angular8
<div id="foto">
    <img class="camera" [src]="imgURL" alt="" *ngIf="imgURL">
    <div class="imgUp">
        <div class="imagePreview"></div>
        <i class="">
            <label for="uploadFileImage" class="labelIcon btn">+
            <input #fileChangeImage type="file" accept=".png, .jpg, .jpeg"
            (change)="preview(fileChangeImage.files)" id="uploadFileImage" class="img"
            value="UploadPhoto" style="width: 0px;height: 0px;overflow: hidden;" [(ngModel)]="myInputValue">
            </label>
        </i>
    </div>
</div>
 */

// Function in javaScript
// Function preview image
/**
 *
 * @param file is image
 */
function preview(files){
    // Comprobando que no este vacio
    if (files.length === 0) {
        this.imgURL = './assets/img/camera-perfil.svg';
        this.existImage = false;
        return;
    }
    // Determinado si el archivo es formato de imagen
    const mineType = files[0].type;
    if (mineType.match(/image\/*/) == null) {
        this.imgURL = './assets/img/camera-perfil.svg';
        this.existImage = false;
        this.mensajeRespuesta = 'Tipo de formato no aceptado';
        this.mostrarMensaje = true;
        this.type = 'error';
        setTimeout(() => {
            this.mostrarMensaje = false;
            this.type = '';
        }, 3000);
        return;

    }
    const render = new FileReader();
    this.imagePath = files;
    if (files[0].size >= 500000) {
        // Limpiar el input de la imagen para render
        this.myInputValue = '';
        this.mensajeRespuesta = 'La imagen no puede exceder el peso de 500kb.';
        this.mostrarMensaje = true;
        this.type = 'error';
        setTimeout(() => {
            this.mostrarMensaje = false;
            this.type = '';
        }, 3000);
        return;
    }
    render.readAsDataURL(files[0]);
    this.imagenSave = files;
    render.onload = (event) => {
        this.existImage = true;
        this.imgURL = render.result;
    };
}