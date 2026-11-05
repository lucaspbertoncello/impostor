import { waitFor } from '@testing-library/react';
import { afterEach, describe, expect, it } from 'vitest';

import { keepLiveAnnouncerEmpty } from '#/shared/ui/utils/live-announcer/keep-live-announcer-empty.util.ts';

function addAnnouncer(): HTMLElement {
  const container = document.createElement('div');
  container.setAttribute('data-live-announcer', 'true');
  const log = document.createElement('div');
  log.setAttribute('role', 'log');
  container.append(log);
  document.body.append(container);
  return log;
}

function announce(log: HTMLElement, text: string) {
  const message = document.createElement('div');
  message.textContent = text;
  log.append(message);
}

afterEach(() => {
  document.body.replaceChildren();
});

describe('keepLiveAnnouncerEmpty', () => {
  it('empties an announcement already there and one written later', async () => {
    const log = addAnnouncer();
    announce(log, '2');

    const stop = keepLiveAnnouncerEmpty();
    expect(log.textContent).toBe('');

    announce(log, '3');
    await waitFor(() => expect(log.textContent).toBe(''));
    stop();
  });

  it('stops emptying once stopped', async () => {
    const log = addAnnouncer();
    const stop = keepLiveAnnouncerEmpty();
    stop();

    announce(log, '4');
    await new Promise((resolve) => setTimeout(resolve, 20));
    expect(log.textContent).toBe('4');
  });
});
