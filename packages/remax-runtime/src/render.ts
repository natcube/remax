import * as React from 'react';
import ReactReconciler from 'react-reconciler';
import hostConfig from './hostConfig';
import Container from './Container';
import AppContainer from './AppContainer';
import { connectToDevTools } from 'react-devtools-core';
import WebSocket from './WebSocket';

export const ReactReconcilerInst = ReactReconciler(hostConfig as any);

connectToDevTools({
  websocket: new WebSocket('ws://localhost:8097'),
});

ReactReconcilerInst.injectIntoDevTools({
  bundleType: 1,
  version: '16.13.1',
  rendererPackageName: 'remax',
});

function getPublicRootInstance(container: ReactReconciler.FiberRoot) {
  const containerFiber = container.current;
  if (!containerFiber.child) {
    return null;
  }
  return containerFiber.child.stateNode;
}

export default function render(rootElement: React.ReactElement | null, container: Container | AppContainer) {
  // Create a root Container if it doesnt exist
  if (!container._rootContainer) {
    container._rootContainer = ReactReconcilerInst.createContainer(container, false, false);
  }

  ReactReconcilerInst.updateContainer(rootElement, container._rootContainer, null, () => {
    // ignore
  });

  return getPublicRootInstance(container._rootContainer);
}
