const FETCH_ITEMS_BUTTON = document.querySelector('.fetch-items');
const MAIN_CONTAINER = document.querySelector('main');
const MODAL_TITLE = document.querySelector('.modal-title');
const MODAL_BODY = document.querySelector('.modal-body');

const fetchIndividualItem = (id) => {
  axios
    .get(`/item/${id}`)
    .then((response) => {
      MODAL_TITLE.innerText = `Item Description - ${response.data.item.name}`;
      MODAL_BODY.innerText = response.data.item.description;
    })
    .catch((error) => {
      console.error(error);
    });
};

const formatButton = (item) => {
  const button = document.createElement('button');
  button.setAttribute('class', 'items');
  button.classList.add(
    'border',
    'rounded',
    'p-4',
    'm-4',
    'col-3',
    'fs-2',
    'btn',
    'btn-success',
  );

  button.innerHTML = item.name;
  button.value = item.id;

  // add data-* attribute to toggle model open and close
  button.dataset.bsToggle = 'modal';
  button.dataset.bsTarget = '#itemModal';

  button.addEventListener('click', () => {
    fetchIndividualItem(item.id);
  });

  MAIN_CONTAINER.appendChild(button);
};

const fetchItems = () => {
  axios
    .get('/items')
    .then((response) => {
      const { items } = response.data;

      items.forEach((item) => {
        formatButton(item);
      });
    })
    .catch((error) => {
      console.error(error);
    });
};

FETCH_ITEMS_BUTTON.addEventListener('click', fetchItems);
