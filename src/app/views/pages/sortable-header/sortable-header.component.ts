import { CommonModule } from '@angular/common';
import { Component, computed, input, output, signal } from '@angular/core';

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
  formattedLabel = computed(() => {
    const value = this.label();
    const parts = value.split(' ');
  
    if (parts.length === 2) {
      return parts.join('<br>');
    }
  
    return value;
  });


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
    this.sortChange.emit(this.field() + ',' + newOrder); 
  }

}
