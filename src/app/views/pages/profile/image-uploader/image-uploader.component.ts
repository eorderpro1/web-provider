import { Component, effect, HostListener, input, signal } from '@angular/core';

@Component({
  selector: 'app-image-uploader',
  standalone: true,
  imports: [],
  templateUrl: './image-uploader.component.html',
  styleUrl: './image-uploader.component.scss'
})
export class ImageUploaderComponent {
  imageSrc = input<string>('https://via.placeholder.com/200');
  localImageSrc = signal<string | null>(null);
  constructor() {
    effect(() => {
      this.localImageSrc.set(this.imageSrc());
    });
  }

  onFileSelected(event: Event) {
    const input = event.target as HTMLInputElement;
    if (input.files?.length) {
      this.readFile(input.files[0]);
    }
  }

  @HostListener('drop', ['$event'])
  onDrop(event: DragEvent) {
    event.preventDefault();
    const file = event.dataTransfer?.files[0];
    if (file && file.type.startsWith('image/')) {
      this.readFile(file);
    }
  }

  @HostListener('dragover', ['$event'])
  onDragOver(event: DragEvent) {
    event.preventDefault();
  }

  private readFile(file: File) {
    const reader = new FileReader();
    reader.onload = () => {
      this.localImageSrc.set(reader.result as string); 
      };
    reader.readAsDataURL(file);
  }
}
