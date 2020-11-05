import { UseSignal } from '@jupyterlab/apputils';

import * as go from 'gojs';
import { produce } from 'immer';
import * as React from 'react';
import { MDBContainer, MDBRow, MDBCol, MDBBtn } from "mdbreact";

import { KernelModel } from './model';
import { DiagramWrapper } from './DiagramWrapper';
import { SelectionInspector } from './SelectionInspector';
import NavbarPage from "./navbar";
import ModalPage from "./modal";


interface IAppProps {
  model: KernelModel;
}

interface IAppState {
  setupModal: boolean;
  hyperModal: boolean;
  nodeDataArray: Array<go.ObjectData>;
  linkDataArray: Array<go.ObjectData>;
  modelData: go.ObjectData;
  selectedData: go.ObjectData | null;
  skipsDiagramUpdate: boolean;
}

class App extends React.Component<IAppProps, IAppState> {
  // Maps to store key -> arr index for quick lookups
  private mapNodeKeyIdx: Map<go.Key, number>;
  private mapLinkKeyIdx: Map<go.Key, number>;

  constructor(props: IAppProps) {
    super(props);
    this.state = {
      setupModal: false,
      hyperModal: false,
      nodeDataArray: [
        { key: 0, text: 'Alpha', color: 'white', loc: '0 0', param: 'GSK', r: 20, input_df: 1 },
        { key: 1, text: 'Beta', color: 'white', loc: '150 0', p0: 'GSK', r: 0, input_df: 0 },
        { key: 2, text: 'Gamma', color: 'white', loc: '0 150', r: 0, input_df: 0 },
        { key: 3, text: 'Delta', color: 'white', loc: '150 150', p1: 'GSK', p2: '[1, 2, 3]', r: 0, input_df: 0 }
      ],
      linkDataArray: [
        { key: -1, from: 0, to: 1 },
        { key: -2, from: 0, to: 2 },
        { key: -3, from: 2, to: 3 },
      ],
      modelData: {
        canRelink: true
      },
      selectedData: null,
      skipsDiagramUpdate: false
    };

    // General UI functions
    this.toggleHyperModal = this.toggleHyperModal.bind(this);
    this.toggleSetupModal = this.toggleSetupModal.bind(this);
    this.onClickFit = this.onClickFit.bind(this);
    this.onClickTransform = this.onClickTransform.bind(this);

    // init maps
    this.mapNodeKeyIdx = new Map<go.Key, number>();
    this.mapLinkKeyIdx = new Map<go.Key, number>();
    this.refreshNodeIndex(this.state.nodeDataArray);
    this.refreshLinkIndex(this.state.linkDataArray);
    // bind handler methods
    this.handleDiagramEvent = this.handleDiagramEvent.bind(this);
    this.handleModelChange = this.handleModelChange.bind(this);
    this.handleInputChange = this.handleInputChange.bind(this);
    this.handleRelinkChange = this.handleRelinkChange.bind(this);
  }

  toggleSetupModal(): void {
    this.setState({
      setupModal: !this.state.setupModal
    }); 
  }

  toggleHyperModal(): void {
    this.setState({
      hyperModal: !this.state.hyperModal
    }); 
  }

  onClickFit(): void {
    alert("Fit Called");
  }

  onClickTransform(): void {
    alert("Transform Called");
  }

  /**
   * Update map of node keys to their index in the array.
   */
  private refreshNodeIndex(nodeArr: Array<go.ObjectData>) {
    this.mapNodeKeyIdx.clear();
    nodeArr.forEach((n: go.ObjectData, idx: number) => {
      this.mapNodeKeyIdx.set(n.key, idx);
    });
  }

  /**
   * Update map of link keys to their index in the array.
   */
  private refreshLinkIndex(linkArr: Array<go.ObjectData>) {
    this.mapLinkKeyIdx.clear();
    linkArr.forEach((l: go.ObjectData, idx: number) => {
      this.mapLinkKeyIdx.set(l.key, idx);
    });
  }

  /**
   * Handle any relevant DiagramEvents, in this case just selection changes.
   * On ChangedSelection, find the corresponding data and set the selectedData state.
   * @param e a GoJS DiagramEvent
   */
  public handleDiagramEvent(e: go.DiagramEvent) {
    const name = e.name;
    switch (name) {
      case 'ChangedSelection': {
        const sel = e.subject.first();
        this.setState(
          produce((draft: IAppState) => {
            if (sel) {
              if (sel instanceof go.Node) {
                const idx = this.mapNodeKeyIdx.get(sel.key);
                if (idx !== undefined && idx >= 0) {
                  const nd = draft.nodeDataArray[idx];
                  draft.selectedData = nd;
                }
              } 
              // Uncomment to show info for links
              // else if (sel instanceof go.Link) {
              //   const idx = this.mapLinkKeyIdx.get(sel.key);
              //   if (idx !== undefined && idx >= 0) {
              //     const ld = draft.linkDataArray[idx];
              //     draft.selectedData = ld;
              //   }
              // }
            } else {
              draft.selectedData = null;
            }
          })
        );
        break;
      }
      default: break;
    }
  }

  /**
   * Handle GoJS model changes, which output an object of data changes via Model.toIncrementalData.
   * This method iterates over those changes and updates state to keep in sync with the GoJS model.
   * @param obj a JSON-formatted string
   */
  public handleModelChange(obj: go.IncrementalData) {
    const insertedNodeKeys = obj.insertedNodeKeys;
    const modifiedNodeData = obj.modifiedNodeData;
    const removedNodeKeys = obj.removedNodeKeys;
    const insertedLinkKeys = obj.insertedLinkKeys;
    const modifiedLinkData = obj.modifiedLinkData;
    const removedLinkKeys = obj.removedLinkKeys;
    const modifiedModelData = obj.modelData;

    // maintain maps of modified data so insertions don't need slow lookups
    const modifiedNodeMap = new Map<go.Key, go.ObjectData>();
    const modifiedLinkMap = new Map<go.Key, go.ObjectData>();
    this.setState(
      produce((draft: IAppState) => {
        let narr = draft.nodeDataArray;
        if (modifiedNodeData) {
          modifiedNodeData.forEach((nd: go.ObjectData) => {
            modifiedNodeMap.set(nd.key, nd);
            const idx = this.mapNodeKeyIdx.get(nd.key);
            if (idx !== undefined && idx >= 0) {
              narr[idx] = nd;
              if (draft.selectedData && draft.selectedData.key === nd.key) {
                draft.selectedData = nd;
              }
            }
          });
        }
        if (insertedNodeKeys) {
          insertedNodeKeys.forEach((key: go.Key) => {
            const nd = modifiedNodeMap.get(key);
            const idx = this.mapNodeKeyIdx.get(key);
            if (nd && idx === undefined) {  // nodes won't be added if they already exist
              this.mapNodeKeyIdx.set(nd.key, narr.length);
              narr.push(nd);
            }
          });
        }
        if (removedNodeKeys) {
          narr = narr.filter((nd: go.ObjectData) => {
            if (removedNodeKeys.includes(nd.key)) {
              return false;
            }
            return true;
          });
          draft.nodeDataArray = narr;
          this.refreshNodeIndex(narr);
        }

        let larr = draft.linkDataArray;
        if (modifiedLinkData) {
          modifiedLinkData.forEach((ld: go.ObjectData) => {
            modifiedLinkMap.set(ld.key, ld);
            const idx = this.mapLinkKeyIdx.get(ld.key);
            if (idx !== undefined && idx >= 0) {
              larr[idx] = ld;
              if (draft.selectedData && draft.selectedData.key === ld.key) {
                draft.selectedData = ld;
              }
            }
          });
        }
        if (insertedLinkKeys) {
          insertedLinkKeys.forEach((key: go.Key) => {
            const ld = modifiedLinkMap.get(key);
            const idx = this.mapLinkKeyIdx.get(key);
            if (ld && idx === undefined) {  // links won't be added if they already exist
              this.mapLinkKeyIdx.set(ld.key, larr.length);
              larr.push(ld);
            }
          });
        }
        if (removedLinkKeys) {
          larr = larr.filter((ld: go.ObjectData) => {
            if (removedLinkKeys.includes(ld.key)) {
              return false;
            }
            return true;
          });
          draft.linkDataArray = larr;
          this.refreshLinkIndex(larr);
        }
        // handle model data changes, for now just replacing with the supplied object
        if (modifiedModelData) {
          draft.modelData = modifiedModelData;
        }
        draft.skipsDiagramUpdate = true;  // the GoJS model already knows about these updates
      })
    );
  }

  /**
   * Handle inspector changes, and on input field blurs, update node/link data state.
   * @param path the path to the property being modified
   * @param value the new value of that property
   * @param isBlur whether the input event was a blur, indicating the edit is complete
   */
  public handleInputChange(path: string, value: string, isBlur: boolean) {
    this.setState(
      produce((draft: IAppState) => {
        const data = draft.selectedData as go.ObjectData;  // only reached if selectedData isn't null
        data[path] = value;
        if (isBlur) {
          const key = data.key;
          if (key < 0) {  // negative keys are links
            const idx = this.mapLinkKeyIdx.get(key);
            if (idx !== undefined && idx >= 0) {
              draft.linkDataArray[idx] = data;
              draft.skipsDiagramUpdate = false;
            }
          } else {
            const idx = this.mapNodeKeyIdx.get(key);
            if (idx !== undefined && idx >= 0) {
              draft.nodeDataArray[idx] = data;
              draft.skipsDiagramUpdate = false;
            }
          }
        }
      })
    );
  }

  /**
   * Handle changes to the checkbox on whether to allow relinking.
   * @param e a change event from the checkbox
   */
  public handleRelinkChange(e: any) {
    const target = e.target;
    const value = target.checked;
    this.setState({ modelData: { canRelink: value }, skipsDiagramUpdate: false });
  }

  public render() {
    const selectedData = this.state.selectedData;
    let inspector;
    if (selectedData !== null) {
      inspector = <SelectionInspector
                    selectedData={this.state.selectedData}
                    onInputChange={this.handleInputChange}
                  />;
    }

    return (
      <React.Fragment>
        <NavbarPage
          onClickSetup={this.toggleSetupModal}
          onClickHyper={this.toggleHyperModal}
          onClickFit={this.onClickFit}
          onClickTransform={this.onClickTransform}
        />
        <ModalPage
          title="Setup"
          body="Will contain field where the setup will be specified"
          modal={this.state.setupModal} 
          toggle={this.toggleSetupModal}
        />
        <ModalPage
          title="Hyperparameter Tuning"
          body="Will be done later"
          modal={this.state.hyperModal} 
          toggle={this.toggleHyperModal}
        />

        <MDBContainer>
          <MDBRow>

            <MDBCol md="3">
              <MDBRow>
                <MDBBtn gradient="blue"
                  onClick={(): void => {
                    this.props.model.execute('100+12');
                  }}
                >
                  100+12
                </MDBBtn>
              </MDBRow>

              <MDBRow>
                <MDBBtn gradient="purple"
                  onClick={(): void => {
                    this.props.model.execute('my_fun()');
                  }}
                >
                  my_fun()
                </MDBBtn>
              </MDBRow>              

              <MDBRow>
                <p>Response: </p>
                <div>
                  <UseSignal signal={this.props.model.stateChanged}>
                    {(): JSX.Element => (
                      <span key="output field">{JSON.stringify(this.props.model.output)}</span>
                    )}
                  </UseSignal>
                </div>
              </MDBRow>

              <MDBRow>
                {inspector}
              </MDBRow>

            </MDBCol>

            <MDBCol md="9" className="scrollbar scrollbar-primary">
              <div className="card">
                <DiagramWrapper
                  nodeDataArray={this.state.nodeDataArray}
                  linkDataArray={this.state.linkDataArray}
                  modelData={this.state.modelData}
                  skipsDiagramUpdate={this.state.skipsDiagramUpdate}
                  onDiagramEvent={this.handleDiagramEvent}
                  onModelChange={this.handleModelChange}
                />
              </div>
            </MDBCol>

          </MDBRow>
        </MDBContainer>
      </React.Fragment>
    );
  }
}

export default App;
