import { MenuItem } from './menu.model';

export const MENU: MenuItem[] = [
  {
    label: 'Orders',
    icon: 'home',
    link: '/orders'
  },
  {
    label: 'Statistics',
    icon: 'pie-chart',
    subMenus: [
      {
        subMenuItems: [
          {
            label: 'Πωλήσεις και Έσοδα',
            link: '/statistics/sales-and-revenue',
          },
          {
            label: 'Παραγγελίες και Δρομολόγια',
            link: '/statistics/orders-and-routes',
          },
          {
            label: 'Αποθέματος και Προβλέψεις',
            link: '/statistics/inventory-and-forecasts',
          },
          {
            label: 'Προσφορών και Διαφημίσεων',
            link: '/statistics/offers-and-ads',
          }
        ]
      }
    ]
  },
  {
    label: 'Products',
    icon: 'box',
    link: '/products'
  },
  {
    label: 'Campaigns',
    icon: 'video',
    link: '/campaigns'
  },
  {
    label: 'Customers',
    icon: 'users',
    link: '/customers'
  },
  {
    label: 'UI Kit',
    icon: 'feather',
    isMegaMenu: true,
    subMenus: [
      {
        subMenuItems: [
          {
            label: 'Basic',
            isTitle: true,
          },
          {
            label: 'Accordion',
            link: '/ui-components/accordion',
          },
          {
            label: 'Alerts',
            link: '/ui-components/alerts',
          },
          {
            label: 'Badges',
            link: '/ui-components/badges',
          },
          {
            label: 'Breadcrumbs',
            link: '/ui-components/breadcrumbs',
          },
          {
            label: 'Buttons',
            link: '/ui-components/buttons',
          },
          {
            label: 'Button group',
            link: '/ui-components/button-group',
          },
          {
            label: 'Cards',
            link: '/ui-components/cards',
          },
          {
            label: 'Carousel',
            link: '/ui-components/carousel',
          },
          {
            label: 'Collapse',
            link: '/ui-components/collapse',
          },
        ]
      },
      {
        subMenuItems: [
          {
            label: 'Datepicker',
            link: '/ui-components/datepicker',
          },
          {
            label: 'Dropdowns',
            link: '/ui-components/dropdowns',
          },
          {
            label: 'List group',
            link: '/ui-components/list-group',
          },
          {
            label: 'Media object',
            link: '/ui-components/media-object',
          },
          {
            label: 'Modal',
            link: '/ui-components/modal',
          },
          {
            label: 'Navs',
            link: '/ui-components/navs',
          },
          {
            label: 'Offcanvas',
            link: '/ui-components/offcanvas',
          },
          {
            label: 'Pagination',
            link: '/ui-components/pagination',
          },
          {
            label: 'Popovers',
            link: '/ui-components/popovers',
          },
          {
            label: 'Progress',
            link: '/ui-components/progress',
          },
        ]
      },
      {
        subMenuItems: [
          {
            label: 'Rating',
            link: '/ui-components/rating',
          },
          {
            label: 'Scrollbar',
            link: '/ui-components/scrollbar',
          },
          {
            label: 'Spinners',
            link: '/ui-components/spinners',
          },
          {
            label: 'Table',
            link: '/ui-components/table',
          },
          {
            label: 'Timepicker',
            link: '/ui-components/timepicker',
          },
          {
            label: 'Tooltips',
            link: '/ui-components/tooltips',
          },
          {
            label: 'Typeadhed',
            link: '/ui-components/typeahead',
          },
        ]
      },
      {
        subMenuItems: [
          {
            label: 'Advanced UI',
            isTitle: true
          },
          {
            label: 'Cropper',
            link: '/advanced-ui/cropper',
          },
          {
            label: 'Owl carousel',
            link: '/advanced-ui/owl-carousel',
          },
          {
            label: 'SortableJs',
            link: '/advanced-ui/sortablejs',
          },
          {
            label: 'Sweet alert',
            link: '/advanced-ui/sweet-alert',
          },
        ]
      }
    ]
  },
  {
    label: 'Special pages',
    icon: 'book',
    isMegaMenu: true,
    subMenus: [
      {
        subMenuItems: [
          {
            label: 'Auth pages',
            isTitle: true
          },
          {
            label: 'Login',
            link: '/auth/login',
          },
          {
            label: 'Register',
            link: '/auth/register',
          },
        ]
      },
      {
        subMenuItems: [
          {
            label: 'Error pages',
            isTitle: true
          },
          {
            label: '404',
            link: '/error/404',
          },
          {
            label: '500',
            link: '/error/500',
          },
        ]
      }
    ]
  }
];
