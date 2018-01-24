import {Component, OnInit, Inject} from '@angular/core';
import {MatDialogRef, MAT_DIALOG_DATA} from "@angular/material";

@Component({
  selector: 'app-image-gallery-modal',
  templateUrl: './image-gallery-modal.component.html',
  styleUrls: ['./image-gallery-modal.component.css']
})
export class ImageGalleryModalComponent implements OnInit {

  constructor(public dialogRef: MatDialogRef<ImageGalleryModalComponent>,
              @Inject(MAT_DIALOG_DATA) public data: any) {
    console.log(data)
  }

  ngOnInit() {
  }

}
