<template>
  <div class="Add">
    <div @submit.prevent>
      <div class="form__header">
        <h3>Agregar un producto</h3>
        <h5>{{ db.message }}</h5>
      </div>
      <section class="Add__section Add__section-rates">
        <fieldset>
          <legend>Descripciones</legend>
          <div class="fieldset fieldset__description">
            <div>
              <label class="fieldset__label">Modelo</label>
              <div class="fieldset__input">
                <input v-model="newItem.modelo"
                          type="number" autofocus
                          placeholder="Por ejemplo, 12340"
                          name="modelo" required>
              </div>
            </div>
            <div>
              <label class="fieldset__label" for="description">Larga</label>
              <textarea v-model="newItem.description"
                        class="fieldset__input-side"
                        type="text"
                        cols="30" rows="6"
                        name="description"></textarea>
            </div>
            <div>
              <label class="fieldset__label" for="title">Corta</label>
              <textarea v-model="newItem.title"
                        class="fieldset__input-side"
                        type="text"
                        cols="30" rows="6"
                        placeholder="nombreDelArchivo.jpg"
                        name="title"></textarea>
            </div>
          </div>
        </fieldset>
      </section>

      <section class="Add__section Add__section-specs">
        <fieldset>
          <legend>Especificaciones</legend>
          <div class="fieldset">
            <div class="fieldset fieldset__collection">
              <h4>Cantidades</h4>

              <span class="fieldset__label" for="isCollection">¿Es una colección?</span>
              <div class="fieldset__input">
                <label class="" for="isCollection">Si</label>
                <input name="isCollection"
                                type="radio"
                               :value=" 1 | valueOfRadioInput"
                  v-model="newItem.specs.amount.collection.isCollection">
                <label for="cost">No</label>
                <input name="isCollection"
                                type="radio"
                               :value=" 0 | valueOfRadioInput"
                  v-model="newItem.specs.amount.collection.isCollection">
              </div>

              <span class="fieldset__label-side" >¿Cuántos por colección?</span>
              <div class="fieldset__input-side">
                <input class="AddSpecs__amount--input input__number"
                        type="number"
              v-model.number="newItem.specs.amount.collection.units"
                        name="amoun.collection.units"><span></span>
              </div>
              <label class="fieldset__label" for="amount.units">¿Cuántas unidades?</label>
              <div class="fieldset__input">
                <input class="AddSpecs__amount--input input__number"
                        type="number"
                        min="1"
                        name="amount.units"
              v-model.number="newItem.specs.amount.units"
                        required><span></span>
              </div>
            </div>

            <div class="fieldset fieldset__specs">
              <h4>Historia</h4>
              <label class="fieldset__label">Diseñador</label>
              <div class="fieldset__input">
                <select class="AddSpecs__datalist"
                  type="text" v-model="newItem.specs.designer.name"
                  name="designer.name">
                    <option disabled value="">Escoge un diseñador</option>
                    <option v-for="(designer, i) in options.designers"
                            :key="`designer#${i}`"
                           :value="designer.name | toLowerCase">
                      {{ designer.name }}
                    </option>
                  </select>
                <span></span>
              </div>

              <label class="fieldset__label">Fabricante</label>
              <div class="fieldset__input">
                <select class="AddSpecs__datalist"
                  type="text" v-model="newItem.specs.manufacturer.name"
                  name="manufacturer.name">
                    <option disabled value="">Escoge un fabricante</option>
                    <option v-for="(manufacturer, i) in options.manufacturers"
                            :key="`manufacturer#${i}`"
                           :value="manufacturer.name | toLowerCase">
                      {{ manufacturer.name }}
                    </option>
                  </select>
                <span></span>
              </div>
            </div>
            <div class="fieldset fieldset__measures">
              <h4>Medidas</h4>
                <label class="fieldset__label">Peso <span><em>(gr)</em></span></label>
                <input class="input__number fieldset__input"
              v-model.number="newItem.specs.measures.weight"
                        type="number"
                        name="measures.weight">
                <label class="fieldset__label">Altura <span><em>(cm)</em></span></label>
                <input class="input__number fieldset__input"
              v-model.number="newItem.specs.measures.height"
                        type="number"
                        name="measures.height">
                <label class="fieldset__label">Largo <span><em>(cm)</em></span></label>
                <input class="input__number fieldset__input"
              v-model.number="newItem.specs.measures.long"
                        type="number"
                        name="measures.long">
                <label class="fieldset__label">Ancho <span><em>(cm)</em></span></label>
                <input class="input__number fieldset__input"
              v-model.number="newItem.specs.measures.width"
                        type="number"
                        name="measures.width">

            </div>
          </div>
        </fieldset>
      </section>

      <section class="Add__section Add__section-setup">
        <fieldset>
          <legend>Valores</legend>
          <div class="fieldset fieldset__rates">
            <div class="fieldset__rates">
              <h4>Precios de venta al público</h4>
              <label class="fieldset__label" for="pvp.unit">Unidad</label>
              <div class="fieldset__input">
                <input class="input__number"
                        min="1"
                        type="number"
                 placeholder="€" v-model.number="newItem.rates.pvp.unit"
                        name="pvp.unit"
                        required><span></span><br>
              </div>

              <label class="fieldset__label-side" for="pvp.collection">Colección</label>
              <div class="fieldset__input-side">
                <input class="input__number"
                        type="number"
                 placeholder="€" v-model.number="newItem.rates.pvp.collection"
                        name="pvp.collection"><span></span>
              </div>
            </div>
            <div>
              <h4>Costos</h4>
              <label class="fieldset__label" for="cost">Costos</label>
              <div class="fieldset__input">
                <input class="input__number"
                        type="number"
                 placeholder="€" v-model.number="newItem.rates.cost"
                        name="cost"><span></span>
              </div>
            </div>
            <div>

            <h4>Categorías</h4>
            <label>Principal</label>
            <div>
              <input class=""
               placeholder="Escribe una (1) palabra"
                   v-model="newItem.setup.family"
                      name="family"
                      required><span></span>
            </div>
            <label>Secundaria</label>
            <div>
              <input class=""
               placeholder="Escribe otra"
                   v-model="newItem.setup.category"
                      name="category"
                      required><span></span>
            </div>
            <label>Otra</label>
            <div>
              <input class=""
               placeholder="Esta no es necesaria"
                   v-model="newItem.setup.subcategory"
                      name="subcategory"><span></span>
            </div>
            </div>
          </div>
        </fieldset>
      </section>

      <section class="Add__section-submit">
        <button class="button__small button-primary Add__submit"
                @click="submitItem()">Agregar producto</button>
      </section>
    </div>
  </div>
</template>

<script>
import { mapState, mapActions } from 'vuex'

export default {
  name: 'app-add',
  data () {
    return {
      options: {
        designers: [
          { name: 'John Doe', value: 'john doe' }
        ],
        manufacturers: [
          { name: 'Coca Cola', value: 'cocacola' }
        ],
        colors: [
          { name: 'red', value: 'rojo' }
        ]
      },
      newItem: {
        title: 'ALAMBRE DE MARMOL',
        model: 999888,
        description: '',
        rates: { pvp: { unit: 23 }, costs: 0 },
        setup: { family: '', category: '', subcategory: '' },
        specs: {
          amount: {
            collection: { isCollection: false, units: 0 },
            units: 0
          },
          designer: '',
          manufacturer: '',
          measures: { weight: '', height: '', long: '', width: '' },
          year: 1000,
          color: '',
          odor: 'olor lima'
        },
        notes: ''
      }
    }
  },
  computed: {
    ...mapState([ 'db' ])
  },
  methods: {
    ...mapActions([ 'addProductToDatabase' ]),

    submitItem () {
      console.log('COMPONENT: ', this.newItem)
      this.addProductToDatabase([this.newItem])
    }

  },
  filters: {
    valueOfRadioInput (value) {
      return !!value
    },
    toLowerCase (str) {
      return str.toLowerCase()
    }
  }
}
</script>

<style>
.Add {
  background-color: #f8f7f2;
  padding: 1.5rem;
  overflow-y: scroll;
  overflow-x: hidden;
  font-size: 1.4rem;
  border-radius: 10px;
  height: 100%;
}
.Add > div {
  grid-row: 2 / 3;
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  grid-template-rows: 4rem auto 5rem;
  height: 100%;
}
.Add fieldset { height: 100% }
.form__header { grid-column: 1 / -1 }
.Add__section { max-height: 900px }
.Add__section-rates {
  grid-column: 1 / 2;
  grid-row: 2;
}
.Add__section-specs {
  grid-column: 2 / 3;
  grid-row: 2;
}
.Add__section-setup {
  grid-column: 3 / 3;
  grid-row: 2;
}
.fieldset legend { text-align: left }
.fieldset {
  display: grid;
  grid-gap: .7rem;
  grid-template-columns: auto;
  height: 100%;
  align-items: center;
}
.fieldset__description { justify-items: right }
/*.fieldset__collection,*/
/*.fieldset__measures { grid-template-columns: repeat(2, 2fr); }
.fieldset__measures,
.fieldset__rates,
.fieldset__specs,
{
  grid-template-columns: 1fr 2fr 1fr 2fr;
}*/
.Add h4 {
  margin: 1rem;
  grid-column: 1 / -1;
}
.fieldset  .fieldset__label { grid-column: 1 / 2 }
.fieldset  .fieldset__input { grid-column: 2 / 3 }
.fieldset  .fieldset__label-side {
  grid-column: 3 / 4;
  grid-row: 2;
 }
.fieldset  .fieldset__input-side {
  grid-column: 4 / 5;
  grid-row: 2;
 }
/*.fieldset__specs .fieldset__input select { width: 70% }
.fieldset__specs .fieldset__label        { justify-self: end }
.fieldset__specs .input__number          { width: 10rem }*/
.Add__section-submit {
  width: 100%;
  grid-column: 1 / -1;
  grid-row: 3 / -1;
  margin-top: .5rem;
}
.Add__submit {
  padding: 1rem;
  width: 50%;
  height: 100%;
  margin-top: .5rem;
}
</style>
