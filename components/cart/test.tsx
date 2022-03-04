import {render, screen} from '@testing-library/react'
import { Provider } from 'react-redux';
import { newLocalProduct, removeLocalOneProduct } from '../../store/actions/cart';
import { createTestStore } from '../../utils/createTestStore';
import '@testing-library/jest-dom'
import Cart from './';
import { productTest } from '../../utils/productTest'

let store:any;
describe("<Cart />", () => {
  beforeEach(() => {
    store = createTestStore();
})
test('cart are returned', async () => {
    // Create a redux store
    render(
        <Provider store={store}>
        <Cart hide={true} setHide={jest.fn()} />
      </Provider>
    );
    expect(screen.getByText('Mi Carrito')).toBeInTheDocument();
});
test('display cart is none, then cart are not visible', () => {
  render(
    <Provider store={store}>
      <Cart hide={false} setHide={jest.fn()} />
    </Provider>
);
  expect(screen.getByText('Mi Carrito')).not.toBeVisible();
})

test('add one product to cart, then new cart are returned', async () => {
    store.dispatch(newLocalProduct(productTest, ''));
    // Create a redux store
   render(
      <Provider store={store}>
        <Cart hide={true} setHide={jest.fn()} />
      </Provider>
    );
   expect(screen.getByText(productTest.name)).toBeInTheDocument();
  });

test('remove one product to cart, then new cart are returned', async () => {
    store.dispatch(newLocalProduct(productTest, ''));
    store.dispatch(removeLocalOneProduct(productTest, ''));
    // Create a redux store
   render(
      <Provider store={store}>
        <Cart hide={true} setHide={jest.fn()} />
      </Provider>
    );
   expect(screen.queryByText(productTest.name)).toBeNull();
  });

test('add one same product to cart, then new cart with two same products are returned', async () => {
  store.dispatch(newLocalProduct(productTest, ''));
  store.dispatch(newLocalProduct(productTest, ''));
  // Create a redux store
 render(
    <Provider store={store}>
      <Cart hide={true} setHide={jest.fn()} />
    </Provider>
  );
 expect(screen.getByText('02')).toBeInTheDocument();
});

});


