import { CommonModule } from '@angular/common';
import { Component, input, output, signal } from '@angular/core';

@Component({
  selector: '[app-sortable-header]',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './sortable-header.component.html',
  styleUrl: './sortable-header.component.scss'
})
export class SortableHeaderComponent {
  field =input<string>('');
  sort =input<{ field: string, order: string }>({ field: '', order: '' });
  label =input<string>('');
  sortChange =output<string>();



  isSorted(): boolean {
    return this.sort().field === this.field();
  }

  isAscending(): boolean {
    return this.isSorted() && this.sort().order === 'asc';
  }

  isDescending(): boolean {
    return this.isSorted() && this.sort().order === 'desc';
  }

  onSort(): void {
    const newOrder = this.isAscending() ? 'desc' : 'asc';
    this.sortChange.emit(this.field() + ',' + newOrder); // Emit field and order
  }

}
