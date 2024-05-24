import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { Card, FormattedCard } from '../../types';
import { TitleComponent } from '../../components/title/title.component';
import { ButtonComponent } from '../../components/button/button.component';
import { LabelComponent } from '../../components/label/label.component';
import { NumberComponent } from '../../components/number/number.component';
import { CheckboxComponent } from '../../components/checkbox/checkbox.component';
import { NumCardsPopupComponent } from '../../components/numCardsPopup/numCardsPopup.component';
import CONSTANTS from '../../../assets/CONSTANTS';
import axios from 'axios';

@Component({
  selector: 'app-cards',
  standalone: true,
  imports: [
    CommonModule,
    TitleComponent,
    ButtonComponent,
    LabelComponent,
    NumberComponent,
    CheckboxComponent,
    NumCardsPopupComponent,
  ],
  templateUrl: './cards.component.html',
})
export class CardsComponent {
  cards: Card[] = [];
  formattedCards: FormattedCard[] = [];

  isNumCardsPopupVisible = true;

  toggleNumber = (cardIndex: number, number: number) => {
    if (number === 0) return;

    this.cards[cardIndex][number] = !this.cards[cardIndex][number];
  };

  numCardsSelect = (numCards: number) => {
    this.isNumCardsPopupVisible = false;

    axios
      .get(`${CONSTANTS.API_BASE_URL}/generate-cards/${numCards}`)
      .then((response) => {
        this.cards = response.data.cards;
        this.formattedCards = response.data.formattedCards;
      });
  };
}
