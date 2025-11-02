import type { Config } from "@measured/puck";
import { HeroComponent } from "../components/puck-components/HeroComponents";
import type { HeroProps } from "../components/puck-components/HeroComponents";
import { TextBlockComponent } from "../components/puck-components/TextBlockComponent";
import type { TextBlockProps } from "../components/puck-components/TextBlockComponent";
import { CardComponent, type CardProps } from "../components/puck-components/CardComponent";
import { GridComponent, type GridProps } from "../components/puck-components/GridComponent";
import { ButtonComponent, type ButtonProps } from "../components/puck-components/ButtonComponent";
import { TableComponent, type TableProps } from "../components/puck-components/TableComponent";


type Props = {
    Hero: HeroProps;
    TextBlock: TextBlockProps;
    Card: CardProps;
    Grid: GridProps;
    Button: ButtonProps;
    Table: TableProps;
};

export const config: Config<Props> = {
    components: {
        Hero: HeroComponent,
        TextBlock: TextBlockComponent,
        Card: CardComponent,
        Grid: GridComponent,
        Button: ButtonComponent,
        Table: TableComponent,
    }
}